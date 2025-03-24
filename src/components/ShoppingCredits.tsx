import React from "react";
import { Button, Table, Empty } from 'antd';
import { useAppSelector } from '../store/hooks';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
    &.ant-btn-primary {
        background: #ec4899 !important;
        border: none !important;
        box-shadow: 0 2px 4px rgba(236, 72, 153, 0.2) !important;
        transition: all 0.3s ease !important;

        &:hover {
            background: #db2777 !important;
            box-shadow: 0 4px 6px rgba(236, 72, 153, 0.3) !important;
        }

        &:disabled {
            background: #f9a8d4 !important;
            opacity: 0.8;
        }
    }
`;

export default function ShoppingCredits() {
    // Mock data - replace with actual data from your backend
    const user = useAppSelector(state => state.auth.user);
    const points = 2000;
    const recentActivity = [
        { id: 1, product: 'PANTS', points: 20, date: '2024-03-23' },
        { id: 2, product: 'SHIRT', points: 15, date: '2024-03-22' },
        { id: 3, product: 'SHOES', points: 30, date: '2024-03-21' },
    ];

    const columns = [
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Points',
            dataIndex: 'points',
            key: 'points',
            render: (points: number) => `${points} PTS`,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    return (
        <div className="p-4">
            {/* User Points Summary */}
            <div className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-2">Hello, {user?.name || 'User'}!</h2>
                <div className="text-4xl font-bold text-pink-500">{points} CREDITED POINTS</div>
                <StyledButton 
                    type="primary" 
                    className="mt-4"
                    size="large"
                    disabled={points < 100}
                >
                    Redeem Now
                </StyledButton>
            </div>

            {/* Recent Activity */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                {recentActivity.length > 0 ? (
                    <Table 
                        columns={columns} 
                        dataSource={recentActivity}
                        rowKey="id"
                        pagination={false}
                    />
                ) : (
                    <Empty 
                        description="No recent activity found" 
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                )}
            </div>
        </div>
    );
}