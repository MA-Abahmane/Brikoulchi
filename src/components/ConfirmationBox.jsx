// export default function ConfirmationBox() {
//     return (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-4 rounded-lg shadow-lg">
//                 helle
//             </div>
//         </div>
//     );
// } 
const ConfirmationBox = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-gray-700 mb-4">{message}</p>
            <div className="flex justify-end gap-4">
                <button
                    onClick={onConfirm}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    aria-label="Confirm logout"
                >
                    Yes
                </button>
                <button
                    onClick={onCancel}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                    aria-label="Cancel logout"
                >
                    No
                </button>
            </div>
        </div>
    </div>
);
export default ConfirmationBox;