const Modal = ({ isOpen, onClose, mediaUrl }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-red-500">
                    Close
                </button>
                <img src={mediaUrl} alt="Media" className="w-full h-auto" />
            </div>
        </div>
    );
};

export default Modal;
