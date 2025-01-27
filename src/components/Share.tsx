import React from "react";

type ShareProps = {
  name: String
};

const Share: React.FC<ShareProps> = ({ name }) => {
  const address =  window.location.origin + window.location.pathname
  const shareText = `See who you've outlived at ${address}.\n\nI've outlived ${name}!`
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
    <>
        <button onClick={handleShare}>
        Share
        </button>
        <br/>
        <br/>
    </>
  );
};

export default Share;
