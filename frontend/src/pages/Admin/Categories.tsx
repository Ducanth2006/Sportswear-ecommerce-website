import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { 
  Button, Input, Table, Tag, Space, 
  Modal, Form, Select, Upload, Switch, message, Popconfirm 
} from 'antd';
import { 
  Plus, Search, Edit2, Trash2, 
  Upload as UploadIcon, Filter, FolderTree, Activity, AlertCircle 
} from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile } from 'antd/es/upload/interface';

interface Category {
  key: string;
  name: string;
  description: string;
  productCount: number;
  displayOrder: number;
  status: 'active' | 'inactive';
  parentId?: string;
  thumbnail?: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  children?: Category[];
}

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState({ totalCategories: 0, activeCategories: 0, emptyCategories: 0 });
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const buildTree = (flatList: Category[]) => {
    const listMap: Record<string, Category> = {};
    const rootNodes: Category[] = [];

    flatList.forEach(item => {
      listMap[item.key] = { ...item, children: undefined };
    });

    flatList.forEach(item => {
      const node = listMap[item.key];
      if (node.parentId) {
        const parent = listMap[node.parentId];
        if (parent) {
          if (!parent.children) parent.children = [];
          parent.children.push(node);
        } else {
          rootNodes.push(node);
        }
      } else {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/admin/categories');
      if (response.status === 200) {
        setCategories(buildTree(response.data));
      }
      
      const statsRes = await axios.get('/api/admin/categories/stats');
      if (statsRes.status === 200) {
        setStats(statsRes.data);
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  // Computed flat list for dropdown parent selection
  const flatCategories = useMemo(() => {
    const result: { label: string; value: string }[] = [];
    const traverse = (cats: Category[], prefix = '') => {
      cats.forEach(c => {
        result.push({ label: prefix + c.name, value: c.key });
        if (c.children) {
          traverse(c.children, prefix + '-- ');
        }
      });
    };
    traverse(categories);
    return result;
  }, [categories]);

  // Filtering
  const filteredData = useMemo(() => {
    let result = categories;

    // We deep clone to filter children safely
    const cloneAndFilter = (items: Category[]): Category[] => {
      return items.map(item => ({ ...item })).filter(item => {
        const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) || 
                            item.slug.toLowerCase().includes(searchText.toLowerCase());
        
        let matchLevel = true;
        if (levelFilter === 'parent') matchLevel = !item.parentId;
        if (levelFilter === 'child') matchLevel = !!item.parentId;

        if (item.children) {
          item.children = cloneAndFilter(item.children);
          // If a child matches but parent doesn't, we still want to keep the parent if searching
          if (item.children.length > 0 && levelFilter === 'all') {
            return true;
          }
        }

        return (matchSearch && matchLevel) || (item.children && item.children.length > 0 && matchLevel);
      });
    };

    if (searchText || levelFilter !== 'all') {
      result = cloneAndFilter(result);
    }

    return result;
  }, [categories, searchText, levelFilter]);


  const handleDelete = async (category: Category) => {
    if (category.productCount > 0) {
      message.error(`Cannot delete "${category.name}" because it contains ${category.productCount} products. Please move them to a different category first.`);
      return;
    }
    
    try {
      const res = await axios.delete(`/api/admin/categories/${category.key}`);
      if (res.status === 200) {
        message.success('Category deleted.');
        fetchCategories();
      }
    } catch (error) {
      message.error('Failed to delete category');
    }
  };

  const handleBulkStatusChange = async (status: 'active' | 'inactive') => {
    if (selectedRowKeys.length === 0) return;
    
    try {
      // Create a function mapped to an array of async patches or use a bulk endpoint.
      // Since no bulk endpoint exists for categories, patch them sequentially.
      await Promise.all(selectedRowKeys.map(key => 
        axios.patch(`/api/admin/categories/${key}`, { status })
      ));
      
      message.success(`Updated status for ${selectedRowKeys.length} categories.`);
      setSelectedRowKeys([]);
      fetchCategories();
    } catch (error) {
      message.error('Failed to update status');
    }
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      form.setFieldsValue({
        ...category,
        status: category.status === 'active'
      });
    } else {
      setEditingCategory(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const onModalOk = () => {
    form.validateFields().then(async values => {
      message.loading({ content: 'Saving...', key: 'saveCat' });
      const payload: any = {
        name: values.name,
        description: values.description || '',
        slug: values.slug || generateSlug(values.name),
        parentId: values.parentId || null,
        status: values.status ? 'active' : 'inactive',
        displayOrder: values.displayOrder || 1,
        metaTitle: values.metaTitle || null,
        metaDescription: values.metaDescription || null,
      };

      try {
        if (editingCategory) {
          // Update
          await axios.patch(`/api/admin/categories/${editingCategory.key}`, payload);
          message.success({ content: 'Category updated successfully.', key: 'saveCat' });
        } else {
          // Create
          payload.id = Date.now().toString();
          payload.productCount = 0;
          await axios.post('/api/admin/categories', payload);
          message.success({ content: 'New category added successfully.', key: 'saveCat' });
        }
        setIsModalVisible(false);
        fetchCategories();
      } catch (error) {
        message.error({ content: 'Failed to save category', key: 'saveCat' });
      }
    });
  };

  const columns: ColumnsType<Category> = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div className="font-medium text-[#191c1e]">{text}</div>
          <div className="text-xs text-[#5b403d] font-mono">/{record.slug}</div>
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      className: 'text-[#5b403d]',
    },
    {
      title: 'Products',
      dataIndex: 'productCount',
      key: 'productCount',
      width: 120,
      render: (count) => (
        <Tag color={count === 0 ? 'default' : 'green'}>{count} items</Tag>
      ),
    },
    {
      title: 'Order',
      dataIndex: 'displayOrder',
      key: 'displayOrder',
      width: 100,
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'active' ? 'bg-[#d5fcde] text-[#2a7a40]' : 'bg-[#eceef0] text-[#5b403d]'
        }`}>
          {status === 'active' ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<Edit2 size={16} />} onClick={() => openModal(record)} className="text-[#00799c] hover:bg-[#e0f2fe]" />
          <Popconfirm 
            title="Delete Category" 
            description={`Are you sure you want to delete "${record.name}"?`}
            onConfirm={() => handleDelete(record)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger icon={<Trash2 size={16} />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6 max-w-[1440px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#191c1e]">Product Categories</h1>
          <p className="text-sm text-[#5b403d] mt-1">Manage product groups and taxonomies.</p>
        </div>
        <Button 
          type="primary" 
          icon={<Plus size={18} />} 
          className="bg-[#d32f2f] hover:bg-[#ba1a20] h-10"
          onClick={() => openModal()}
        >
          Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Categories', value: stats.totalCategories.toString(), icon: FolderTree, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Categories', value: stats.activeCategories.toString(), icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Empty Categories', value: stats.emptyCategories.toString(), icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-[#d8dadc] shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${stat.bg}`}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#191c1e]">{stat.value}</p>
              <p className="text-sm text-[#5b403d] font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#d8dadc] rounded-xl shadow-sm">
        <div className="p-4 border-b border-[#d8dadc] flex flex-col md:flex-row justify-between gap-4">
          <div className="flex flex-1 gap-4">
            <Input 
              placeholder="Search by name or slug..." 
              prefix={<Search size={16} className="text-[#8f6f6c]" />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="max-w-sm rounded-lg"
              allowClear
            />
            <Select 
              value={levelFilter} 
              onChange={setLevelFilter}
              className="w-48 rounded-lg"
              options={[
                { value: 'all', label: 'All levels' },
                { value: 'parent', label: 'Parent Category' },
                { value: 'child', label: 'Child Category' },
              ]}
            />
          </div>
          {selectedRowKeys.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#5b403d]">Selected {selectedRowKeys.length}</span>
              <Button onClick={() => handleBulkStatusChange('active')} size="small" className="border-green-500 text-green-600">Show</Button>
              <Button onClick={() => handleBulkStatusChange('inactive')} size="small" danger>Hide</Button>
            </div>
          )}
        </div>
        
        <Table<Category>
          columns={columns}
          dataSource={filteredData}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={false}
          loading={loading}
          className="overflow-x-auto custom-table"
        />
      </div>

      {/* Add / Edit Category Modal */}
      <Modal
        title={<span className="text-lg font-bold">{editingCategory ? 'Edit Category' : 'Add New Category'}</span>}
        open={isModalVisible}
        onOk={onModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{ className: "bg-[#00799c] hover:bg-[#006280]" }}
      >
        <Form 
          form={form} 
          layout="vertical" 
          className="mt-6 text-[#191c1e]"
          initialValues={{ status: true, displayOrder: 1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Form.Item 
              name="name" 
              label="Category Name" 
              rules={[{ required: true, message: 'Please enter category name!' }]}
            >
              <Input 
                onChange={(e) => {
                  if (!editingCategory) {
                    form.setFieldsValue({ slug: generateSlug(e.target.value) });
                  }
                }}
              />
            </Form.Item>

            <Form.Item name="slug" label="Slug">
              <Input prefix="/" placeholder="auto-generated-from-name" />
            </Form.Item>

            <Form.Item name="parentId" label="Parent Category (Optional)">
              <Select 
                allowClear
                placeholder="As Root Category"
                options={flatCategories.filter(c => c.value !== editingCategory?.key)}
              />
            </Form.Item>

            <Form.Item name="displayOrder" label="Display Order">
              <Input type="number" min={1} />
            </Form.Item>
          </div>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <div className="bg-[#f7f9fb] p-4 rounded-lg mb-6 border border-[#eceef0]">
            <h4 className="font-semibold mb-4 text-[#5b403d]">SEO & Display</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <Form.Item name="metaTitle" label="Meta Title">
                <Input placeholder="Page Title (Meta Title)" />
              </Form.Item>
              <Form.Item name="status" label="Status" valuePropName="checked" className="md:row-span-2">
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
              <Form.Item name="metaDescription" label="Meta Description">
                <Input.TextArea rows={2} placeholder="SEO Description..." />
              </Form.Item>
            </div>
          </div>

          <Form.Item label="Thumbnail/Icon">
            <Upload listType="picture-card" fileList={fileList} onChange={({ fileList: newFileList }) => setFileList(newFileList)}>
              {fileList.length >= 1 ? null : (
                <div>
                  <UploadIcon size={20} className="mx-auto text-gray-400" />
                  <div className="mt-2 text-xs text-gray-500">Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
