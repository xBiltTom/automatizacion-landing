import { X } from 'lucide-react';
import PostulanteCard from './PostulanteCard';
import './PostulanteModal.css';

const PostulanteModal = ({ postulante, onClose }) => {
  if (!postulante) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="modal-body">
          <PostulanteCard postulante={postulante} />
        </div>
      </div>
    </div>
  );
};

export default PostulanteModal;
