import React, { useState } from "react";

const Thumb = () => {
  const [boardName, setBoardName] = useState("");
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  // Delete a thumbnail from the selected board
  const handleThumbnailDelete = (thumbIndex) => {
    if (selectedBoard === null) return;
    const updatedBoards = [...boards];
    updatedBoards[selectedBoard].files = updatedBoards[
      selectedBoard
    ].files.filter((_, index) => index !== thumbIndex);
    setBoards(updatedBoards);
  };

  // Extract YouTube thumbnail
  const extractThumbnail = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=|\/embed\/|watch\?v=)([^&?/]+)/);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : null;
  };

  // Add a new board/folder
  const handleAddBoard = () => {
    if (boardName.trim() === "") return;
    const newBoard = { name: boardName, files: [] };
    setBoards([...boards, newBoard]);
    setBoardName("");
  };

  // Delete a board
  const handleDeleteBoard = (index) => {
    const updated = boards.filter((_, idx) => idx !== index);
    setBoards(updated);
    if (selectedBoard === index) setSelectedBoard(null);
  };

  // Add a file (thumbnail) to selected board
  const handleAddThumbnail = () => {
    const thumbUrl = extractThumbnail(videoUrl);
    if (!thumbUrl || selectedBoard === null)
      return alert("Select board and enter valid link");
    const updatedBoards = [...boards];
    updatedBoards[selectedBoard].files.push(thumbUrl);
    setBoards(updatedBoards);
    setVideoUrl("");
  };

  return (
    <div className="w-full h-screen flex bg-white">
      {/* Sidebar */}
      <div className="w-[25%] border-r h-full p-4 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Folders</h2>
          <span className="text-xl cursor-pointer">📁</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="New Folder"
            className="w-[70%] rounded px-3 py-1 text-sm border border-gray-300"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
          <button
            className="px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200 transition"
            onClick={handleAddBoard}
          >
            Add
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {boards.map((board, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-2 rounded cursor-pointer ${
                selectedBoard === index ? "bg-gray-300" : "hover:bg-gray-100"
              }`}
              onClick={() => setSelectedBoard(index)}
            >
              <span>📂 {board.name}</span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBoard(index);
                }}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="w-[75%] h-full flex flex-col">
        {/* Header */}
        <div className="w-full flex justify-between items-center h-[70px] border-b px-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold">
              {selectedBoard !== null
                ? boards[selectedBoard].name
                : "No Folder Selected"}
            </h1>
          </div>

          {selectedBoard !== null && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Paste YouTube link"
                className="rounded-md px-3 py-1 border border-gray-300 w-[300px]"
              />
              <button
                onClick={handleAddThumbnail}
                className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {selectedBoard !== null && boards[selectedBoard].files.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {boards[selectedBoard].files.map((thumb, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer relative "
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${idx}`}
                    className="w-full h-[180px] object-cover rounded-t-2xl"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-base mb-1">
                      Video {idx + 1}
                    </h3>
                    <p className="text-sm text-gray-600">🎥 Added to folder</p>
                  </div>
                  <button
                    onClick={() => handleThumbnailDelete(idx)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs "
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-8">
              {selectedBoard === null
                ? "Select a folder to view thumbnails"
                : "No thumbnails in this folder."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thumb;
