import React, { useState } from 'react';
import { Modal, Form, Input, message, DatePicker } from 'antd';
import { createGroupBuy, CreateGroupBuyResponse, getGroupBuy, GroupBuy, joinGroupBuy } from '../api/groupBuyApi';
import { TeamOutlined, LinkOutlined, UsergroupAddOutlined, CalendarOutlined, PercentageOutlined, UserAddOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface GroupBuyDetails {
    current_participants: number;
    discount_percentage: number;
    end_date: string;
    id: number;
    min_participants: number;
    product_id: number;
    product_name: string;
    status: string;
    unique_link: string;
}

interface SuccessResponse {
    group_buy: GroupBuyDetails;
    message: string;
    status: 'success';
}

interface GroupBuyDialogProps {
    productId: number;
    productName: string;
    variant?: 'list' | 'detail';
    uniqueLink?: string | null;
}

const GroupBuyDialog: React.FC<GroupBuyDialogProps> = ({ productId, productName, variant = 'detail', uniqueLink }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [createdGroupBuy, setCreatedGroupBuy] = useState<CreateGroupBuyResponse | null>(null);
    const [existingGroupBuy, setExistingGroupBuy] = useState<GroupBuy | null>(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);

    const handleCreateGroupBuy = async (values: any) => {
        try {
            setLoading(true);
            const response = await createGroupBuy(
                productId,
                Number(values.discount_percentage),
                Number(values.min_participants),
                values.end_date.format('YYYY-MM-DDTHH:mm:ss')
            );

            setCreatedGroupBuy(response);
            setIsModalVisible(false);
            setIsSuccessModalVisible(true);
            form.resetFields();
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'Failed to create group buy');
        } finally {
            setLoading(false);
        }
    };

    const handleViewGroupBuy = async () => {
        if (!uniqueLink) return;
        
        try {
            setViewLoading(true);
            const groupBuy = await getGroupBuy(uniqueLink);
            setExistingGroupBuy(groupBuy);
            setIsModalVisible(true);
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'Failed to fetch group buy details');
        } finally {
            setViewLoading(false);
        }
    };

    const handleJoinGroupBuy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!uniqueLink) return;
        
        try {
            const response = await joinGroupBuy(uniqueLink);
            if (response.status === 'success') {
                message.success(response.message);
                // Refresh group buy details after joining
                handleViewGroupBuy();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error('Failed to join group buy');
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (uniqueLink) {
            handleViewGroupBuy();
        } else {
            setIsModalVisible(true);
        }
    };

    const buttonContent = variant === 'list' ? (
        <div className="flex items-center space-x-2">
            {uniqueLink && (
                <div 
                    className="w-7 h-7 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-200 hover:scale-110"
                    onClick={handleJoinGroupBuy}
                >
                    <UserAddOutlined style={{ fontSize: '16px' }} />
                </div>
            )}
            <div 
                className={`w-7 h-7 ${uniqueLink ? 'bg-pink-500' : 'bg-gray-500'} text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-200 hover:scale-110`}
                onClick={handleClick}
            >
                <TeamOutlined style={{ fontSize: '16px' }} />
            </div>
        </div>
    ) : (
        <div className="flex items-center space-x-2">
            {uniqueLink && (
                <button 
                    className="flex-1 bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center"
                    onClick={handleJoinGroupBuy}
                >
                    <UserAddOutlined className="mr-2" />
                    Join Group Buy
                </button>
            )}
            <button 
                className={`flex-1 ${uniqueLink ? 'bg-pink-500' : 'bg-gray-500'} text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center`}
                onClick={handleClick}
            >
                <TeamOutlined className="mr-2" />
                {uniqueLink ? 'View Group Buy' : 'Start Group Buy'}
            </button>
        </div>
    );

    const renderModalContent = () => {
        if (existingGroupBuy) {
            return (
                <div className="mt-6 space-y-6">
                    <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                        <div className="flex items-center">
                            <UsergroupAddOutlined className="text-pink-500 text-lg mr-3" />
                            <div>
                                <div className="text-gray-600">Participants</div>
                                <div className="text-lg font-medium">
                                    {existingGroupBuy.current_participants} / {existingGroupBuy.min_participants} needed
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <PercentageOutlined className="text-pink-500 text-lg mr-3" />
                            <div>
                                <div className="text-gray-600">Discount</div>
                                <div className="text-lg font-medium">{existingGroupBuy.discount_percentage}% off</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <CalendarOutlined className="text-pink-500 text-lg mr-3" />
                            <div>
                                <div className="text-gray-600">End Date</div>
                                <div className="text-lg font-medium">
                                    {dayjs(existingGroupBuy.end_date).format('MMM D, YYYY HH:mm')}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <LinkOutlined className="text-pink-500 text-lg mr-3" />
                            <div>
                                <div className="text-gray-600">Status</div>
                                <div className="text-lg font-medium capitalize">{existingGroupBuy.status}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={() => setIsModalVisible(false)}
                            className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <Form
                form={form}
                onFinish={handleCreateGroupBuy}
                layout="vertical"
                className="mt-4"
                validateTrigger={['onChange', 'onBlur']}
            >
                <Form.Item
                    label={
                        <div className="flex items-center">
                            <span className="text-gray-700 font-medium">Discount Percentage</span>
                        </div>
                    }
                    name="discount_percentage"
                    rules={[
                        { required: true, message: 'Please enter discount percentage' },
                        { 
                            validator: async (_, value) => {
                                const num = Number(value);
                                if (isNaN(num) || num < 1 || num > 99) {
                                    throw new Error('Discount must be between 1-99%');
                                }
                            }
                        }
                    ]}
                    validateFirst={true}
                >
                    <Input 
                        type="number" 
                        placeholder="10" 
                        className="rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500 h-10"
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <div className="flex items-center">
                            <span className="text-gray-700 font-medium">End Date</span>
                        </div>
                    }
                    name="end_date"
                    rules={[
                        { required: true, message: 'Please select end date' },
                        {
                            validator: async (_, value) => {
                                if (!value) return Promise.resolve();
                                const selectedDate = value.toDate();
                                const now = new Date();
                                if (selectedDate <= now) {
                                    throw new Error('End date must be in the future');
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                    validateFirst={true}
                >
                    <DatePicker 
                        showTime 
                        className="w-full rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500 h-10"
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={(current) => {
                            return current && current <= dayjs().startOf('day');
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <div className="flex items-center">
                            <span className="text-gray-700 font-medium">Minimum Participants</span>
                        </div>
                    }
                    name="min_participants"
                    rules={[
                        { required: true, message: 'Please enter minimum participants' },
                        { 
                            validator: async (_, value) => {
                                const num = Number(value);
                                if (isNaN(num) || num < 2) {
                                    throw new Error('Minimum 2 participants required');
                                }
                            }
                        }
                    ]}
                    validateFirst={true}
                >
                    <Input 
                        type="number" 
                        placeholder="5" 
                        className="rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500 h-10"
                    />
                </Form.Item>

                <Form.Item className="mb-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-pink-500 text-white py-3 px-6 rounded-lg text-base font-medium hover:bg-pink-600 transition-colors flex items-center justify-center ${
                            loading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Creating...
                            </div>
                        ) : (
                            'Create Group Buy'
                        )}
                    </button>
                </Form.Item>
            </Form>
        );
    };

    return (
        <>
            {buttonContent}

            <Modal
                title={
                    <div className="text-xl font-semibold text-gray-800">
                        {existingGroupBuy ? 'Group Buy Details' : `Start Group Buy for ${productName}`}
                    </div>
                }
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setExistingGroupBuy(null);
                }}
                footer={null}
                className="rounded-lg"
            >
                {viewLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : renderModalContent()}
            </Modal>

            <Modal
                title={
                    <div className="text-xl font-semibold text-gray-800 flex items-center">
                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3">
                            <TeamOutlined className="text-white text-lg" />
                        </div>
                        Group Buy Created Successfully!
                    </div>
                }
                open={isSuccessModalVisible}
                onCancel={() => setIsSuccessModalVisible(false)}
                footer={null}
                className="rounded-lg"
            >
                {createdGroupBuy && (
                    <div className="mt-6 space-y-6">
                        <div className="bg-pink-50 p-6 rounded-lg space-y-4">
                            <div className="flex items-center">
                                <UsergroupAddOutlined className="text-pink-500 text-lg mr-3" />
                                <div>
                                    <div className="text-gray-600">Participants</div>
                                    <div className="text-lg font-medium">
                                        {createdGroupBuy.group_buy.current_participants} / {createdGroupBuy.group_buy.min_participants} needed
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <PercentageOutlined className="text-pink-500 text-lg mr-3" />
                                <div>
                                    <div className="text-gray-600">Discount</div>
                                    <div className="text-lg font-medium">{createdGroupBuy.group_buy.discount_percentage}% off</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <CalendarOutlined className="text-pink-500 text-lg mr-3" />
                                <div>
                                    <div className="text-gray-600">End Date</div>
                                    <div className="text-lg font-medium">
                                        {dayjs(createdGroupBuy.group_buy.end_date).format('MMM D, YYYY HH:mm')}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <LinkOutlined className="text-pink-500 text-lg mr-3" />
                                <div>
                                    <div className="text-gray-600">Share Link</div>
                                    <div className="text-lg font-medium break-all">
                                        {window.location.origin}/groupbuy/{createdGroupBuy.group_buy.unique_link}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                onClick={() => setIsSuccessModalVisible(false)}
                                className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default GroupBuyDialog; 