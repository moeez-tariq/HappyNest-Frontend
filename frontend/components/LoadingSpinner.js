export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center mt-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-b-4 border-gray-300"></div>
      </div>
    );
  }