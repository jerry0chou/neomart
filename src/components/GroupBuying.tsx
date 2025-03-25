import React, { useEffect, useState } from 'react';
import { Button, Card, Input, message, Progress, Spin } from 'antd';
import { ShareAltOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { createGroupBuy, getGroupBuy, joinGroupBuy, applyGroupBuyDiscount } from '../api/groupBuyApi';
import { Product } from '../api/homeApi';

interface GroupBuyingProps {
    product?: Product;
    onClose?: () => void;
}

export default function GroupBuying({ product, onClose }: GroupBuyingProps) {
    const [loading, setLoading] = useState(false);
    const [groupBuyLink, setGroupBuyLink] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState(10);
    const [minParticipants, setMinParticipants] = useState(5);
    const [currentParticipants, setCurrentParticipants] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (groupBuyLink) {
            const fetchGroupBuyDetails = async () => {
                try {
                    const details = await getGroupBuy(groupBuyLink);
                    setCurrentParticipants(details.current_participants);
                    setMinParticipants(details.min_participants);
                    setDiscountPercentage(details.discount_percentage);
                } catch (error) {
                    messageApi.error('Failed to fetch group buy details');
                }
            };

            const interval = setInterval(fetchGroupBuyDetails, 5000); // Poll every 5 seconds
            return () => clearInterval(interval);
        }
    }, [groupBuyLink]);

    const handleCreateGroupBuy = async () => {
        if (!product) {
            messageApi.error('No product selected');
            return;
        }

        setLoading(true);
        try {
            const response = await createGroupBuy(product.id, discountPercentage, minParticipants);
            if (response.status === 'success' && response.unique_link) {
                setGroupBuyLink(response.unique_link);
                messageApi.success('Group buy created successfully!');
            } else {
                messageApi.error(response.message);
            }
        } catch (error) {
            messageApi.error('Failed to create group buy');
        } finally {
            setLoading(false);
        }
    };

    const handleJoinGroupBuy = async () => {
        if (!groupBuyLink) {
            messageApi.error('No group buy link provided');
            return;
        }

        setLoading(true);
        try {
            const response = await joinGroupBuy(groupBuyLink);
            if (response.status === 'success') {
                messageApi.success('Successfully joined the group buy!');
                const details = await getGroupBuy(groupBuyLink);
                setCurrentParticipants(details.current_participants);
            } else {
                messageApi.error(response.message);
            }
        } catch (error) {
            messageApi.error('Failed to join group buy');
        } finally {
            setLoading(false);
        }
    };

    const handleShareLink = () => {
        const shareUrl = `${window.location.origin}/groupbuy/${groupBuyLink}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            messageApi.success('Share link copied to clipboard!');
        });
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Spin size="large" /></div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            {contextHolder}
            <Card title="Group Buying" extra={onClose && <Button onClick={onClose}>Close</Button>}>
                {product && (
                    <div className="mb-4">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-gray-500">Original Price: ${product.price}</p>
                    </div>
                )}

                {!groupBuyLink ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Discount Percentage</label>
                            <Input
                                type="number"
                                value={discountPercentage}
                                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                                min={1}
                                max={50}
                                suffix="%"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Minimum Participants</label>
                            <Input
                                type="number"
                                value={minParticipants}
                                onChange={(e) => setMinParticipants(Number(e.target.value))}
                                min={2}
                                max={20}
                            />
                        </div>
                        <Button type="primary" block onClick={handleCreateGroupBuy}>
                            Create Group Buy
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="text-center">
                            <Progress
                                type="circle"
                                percent={Math.round((currentParticipants / minParticipants) * 100)}
                                format={() => (
                                    <div>
                                        <div className="text-lg font-medium">{currentParticipants}/{minParticipants}</div>
                                        <div className="text-xs text-gray-500">Participants</div>
                                    </div>
                                )}
                            />
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-2">
                                {currentParticipants >= minParticipants
                                    ? 'Group buy goal reached! Discount activated!'
                                    : `${minParticipants - currentParticipants} more participants needed`}
                            </p>
                            <p className="text-lg font-medium">
                                {currentParticipants >= minParticipants && (
                                    <span className="text-green-500">{discountPercentage}% OFF</span>
                                )}
                            </p>
                        </div>

                        <div className="flex space-x-2">
                            <Button block icon={<UserOutlined />} onClick={handleJoinGroupBuy}>
                                Join Group
                            </Button>
                            <Button block icon={<ShareAltOutlined />} onClick={handleShareLink}>
                                Share Link
                            </Button>
                            {currentParticipants >= minParticipants && (
                                <Button
                                    type="primary"
                                    block
                                    icon={<ShoppingCartOutlined />}
                                    className="bg-pink-500 hover:bg-pink-600"
                                    onClick={() => {/* Add to cart with discount */}}
                                >
                                    Buy Now
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}