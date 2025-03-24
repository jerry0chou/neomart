import React from 'react';
import { Button, Input, List, Tag } from 'antd';
import { ShareAltOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

// 创建自定义按钮组件来覆盖 Ant Design 的默认样式
const StyledButton = styled(Button)`
    &.ant-btn-primary {
        background: linear-gradient(to right, #f43f5e, #fb7185) !important;
        border: none !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.3s ease !important;

        &:hover {
            background: linear-gradient(to right, #e11d48, #f43f5e) !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15) !important;
        }
    }
`;

export default function GroupBuying() {
    // Mock data - replace with actual data from your backend
    const activeGroups = [
        { id: 1, name: 'Summer Collection', members: 3, target: 5, discount: '20%' },
        { id: 2, name: 'Electronics Bundle', members: 2, target: 4, discount: '15%' },
    ];

    return (
        <div className="p-4">
            {/* Create New Group */}
            <div className="bg-gradient-to-r from-pink-100 to-rose-50 rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-6 text-pink-700">Start a Group Buy</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-pink-600 mb-2">Group Name</label>
                        <Input 
                            placeholder="Enter group name" 
                            className="mb-2 h-12 text-base"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-pink-600 mb-2">Target Members</label>
                        <Input 
                            placeholder="Enter target number of members" 
                            type="number" 
                            className="mb-2 h-12 text-base"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-pink-600 mb-2">Discount Percentage</label>
                        <Input 
                            placeholder="Enter discount percentage" 
                            type="number" 
                            className="mb-2 h-12 text-base"
                        />
                    </div>
                    <StyledButton 
                        type="primary" 
                        className="w-full h-12 text-base"
                    >
                        Create Group
                    </StyledButton>
                </div>
            </div>

            {/* Active Groups */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-6 text-pink-700">Active Groups</h3>
                <List
                    dataSource={activeGroups}
                    renderItem={group => (
                        <List.Item
                            actions={[
                                <StyledButton 
                                    type="primary" 
                                    icon={<ShareAltOutlined />}
                                >
                                    Invite
                                </StyledButton>
                            ]}
                        >
                            <List.Item.Meta
                                title={<span className="text-pink-700 font-medium">{group.name}</span>}
                                description={
                                    <div className="flex items-center gap-3 mt-2">
                                        <Tag color="pink" className="px-3 py-1">
                                            <UserOutlined className="mr-1" /> {group.members}/{group.target} members
                                        </Tag>
                                        <Tag color="red" className="px-3 py-1">{group.discount} off</Tag>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}