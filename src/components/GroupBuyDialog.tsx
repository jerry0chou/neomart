import React, { useState } from 'react';
import { Modal, Form, Input, message, DatePicker } from 'antd';
import { createGroupBuy } from '../api/groupBuyApi';
import { TeamOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface GroupBuyDialogProps {
    productId: number;
    productName: string;
    variant?: 'list' | 'detail';
}

const GroupBuyDialog: React.FC<GroupBuyDialogProps> = ({ productId, productName, variant = 'detail' }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleCreateGroupBuy = async (values: any) => {
        try {
            setLoading(true);
            const response = await createGroupBuy(
                productId,
                Number(values.discount_percentage),
                Number(values.min_participants),
                values.end_date.format('YYYY-MM-DDTHH:mm:ss')
            );

            if (response.status === 'success') {
                message.success('Group buy created successfully!');
                setIsModalVisible(false);
                form.resetFields();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error('Failed to create group buy');
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalVisible(true);
    };

    const buttonContent = variant === 'list' ? (
        <div 
            className="w-7 h-7 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-200 hover:scale-110"
            onClick={handleClick}
        >
            <TeamOutlined style={{ fontSize: '16px' }} />
        </div>
    ) : (
        <button 
            className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center"
            onClick={handleClick}
        >
            <TeamOutlined className="mr-2" />
            Start Group Buy
        </button>
    );

    return (
        <>
            {buttonContent}

            <Modal
                title={
                    <div className="text-xl font-semibold text-gray-800">
                        Start Group Buy for {productName}
                    </div>
                }
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className="rounded-lg"
            >
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

                <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                        <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                        <p>Share this link with friends to join the group buy</p>
                    </div>
                    <div className="flex items-center">
                        <div className="w-1 h-1 bg-gray-500 rounded-full mr-2"></div>
                        <p>Discount will be applied once the target is reached</p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default GroupBuyDialog; 