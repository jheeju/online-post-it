import React from 'react';
import { HiMinusCircle } from 'react-icons/hi';
import { RiCloseCircleFill } from 'react-icons/ri';
import { PostItInterface } from '../state/reducers/boardReducer';
import { useDispatch } from 'react-redux';
import { deletePostIt, hidePostIt, setModal, updatePostIt } from '../state/action-creators';
import { Modal, Text, Button, Row } from '@nextui-org/react';
interface IProps {
  item: PostItInterface;
}

const PostIt: React.FC<IProps> = ({ item }) => {
  const { hidden, isModalOpen } = item;

  const [x, y] = item.positions;
  const style = {
    left: `${x}px`,
    top: `${y}px`,
  };

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const payload = {
      id: item.pId,
      field: e.target.name,
      value: e.target.value,
    };
    dispatch(updatePostIt(payload));
  };

  const handleIconClick = (button: string) => {
    switch (button) {
      case 'hide':
        dispatch(hidePostIt(item.pId));
        break;
      case 'delete':
        if (item.title || item.content) {
          dispatch(setModal({ id: item.pId, value: true }));
        } else {
          dispatch(deletePostIt(item.pId));
        }
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    dispatch(setModal({ id: item.pId, value: false }));
  };

  const handleDeleteConfirm = () => {
    dispatch(setModal({ id: item.pId, value: false }));
    dispatch(deletePostIt(item.pId));
  };

  return (
    <div className="postIt-wrapper" style={style}>
      <div className="title-bar">
        <input onChange={handleInputChange} type="text" name="title" value={item.title} />
        <div className="icons">
          <HiMinusCircle className="icon" onClick={() => handleIconClick('hide')} />
          <RiCloseCircleFill className="icon" onClick={() => handleIconClick('delete')} />
        </div>
      </div>
      <textarea onChange={handleInputChange} name="content" value={item.content} style={{ visibility: hidden ? 'hidden' : 'visible' }} />
      <Modal open={isModalOpen} onClose={handleClose} width="22rem">
        <Modal.Header />
        <Modal.Body>
          <Text size={15}>정말 삭제하시겠습니까?</Text>
        </Modal.Body>
        <Modal.Footer>
          <Row justify="space-around">
            <Button light color="primary" size="sm" onClick={handleClose}>
              취소
            </Button>
            <Button flat color="primary" size="sm" onClick={handleDeleteConfirm}>
              확인
            </Button>
          </Row>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostIt;
