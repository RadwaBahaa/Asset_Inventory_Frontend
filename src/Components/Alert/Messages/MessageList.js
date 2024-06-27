import React, { useEffect, useState } from 'react';
import { Avatar, List, message, Modal } from 'antd';
import VirtualList from 'rc-virtual-list';

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

const MessageList = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageContent, setMessageContent] = useState('');

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
      appendData();
    }
  };

  const handleButtonClick = (message) => {
    setMessageContent(message); // Set message content for popup
    setIsModalVisible(true); // Show popup
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Hide popup
  };

  return (
    <List style={{ padding: '24px' }}>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}> {/* Flexbox for right alignment */}
              <button style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#3089E8',
                fontWeight: 'normal', // Default font weight
                marginRight: '24px',
                cursor: 'pointer',
              }} onClick={() => handleButtonClick(item.email)}>View Message</button>  {/* Replace "View" with your desired button text */}
            </div>
          </List.Item>
        )}
      </VirtualList>

      <Modal
        title="Message"  /* Changed title to "Message" */
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}  /* Remove default footer */
      >
        <p>{messageContent}</p>  {/* Display message content as text */}
      </Modal>
    </List>
  );
};

export default MessageList;