import React from "react";
import { useParams } from "react-router";

interface TrackingParams extends Record<string, string | undefined> {
  trackingCode?: string;
}

const ShowTrackingStatus: React.FC = () => {
  const { trackingCode } = useParams<TrackingParams>();

  if (!trackingCode) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-900 text-white text-lg font-semibold">
        No tracking code found in URL.
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-900">
      <iframe
        src={`https://steadfast.com.bd/t/${trackingCode}`}
        title={`Tracking Status for ${trackingCode}`}
        className="w-full h-full border-0"
        allowFullScreen
      >
        <p className="text-center text-white">
          Your browser does not support iframes. Please visit{" "}
          <a
            href={`https://steadfast.com.bd/t/${trackingCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            this link
          </a>
          .
        </p>
      </iframe>
    </div>
  );
};

export default ShowTrackingStatus;
