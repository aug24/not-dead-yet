import React from "react";

type ShareProps = {
  name: String
};

const Share: React.FC<ShareProps> = ({ name }) => {
  const shareText = `See who you've outlived.  I've outlived ${name}`
  const handleShare = async () => {
    const shareData = {
      title: "I'm Not Dead Yet!",
      text: shareText,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Content shared successfully!");
      } else {
        alert("Web Share API is not supported in this browser.");
      }
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  };

  return (
    <button
      onClick={handleShare}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#4caf50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Share This Page
    </button>
  );
};

export default Share;
