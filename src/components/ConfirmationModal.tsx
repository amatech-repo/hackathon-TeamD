interface ConfirmationModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export default function ConfirmationModal({
    message,
    onConfirm,
    onCancel,
  }: ConfirmationModalProps) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 shadow-md rounded-lg text-center">
          <p className="mb-4">{message}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              削除
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
    );
  }
  