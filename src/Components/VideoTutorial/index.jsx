import React from "react";

export const VideoTutorial = () => {
  return (
    <>
      <div className="untree_co-section">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 className="section-title text-center mb-3">
                Don't know how to start?
              </h2>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <iframe
                width="760"
                height="415"
                src="https://www.youtube.com/embed/SDz2460AjNo?si=t87DCCsVBP160U9D"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
