import React from "react";
import CommunityComponent from "./CommunityComponent";

export default function CommunityNew() {
  
    const title= "Welcome to the Community"
    const description= "Discover what's new"
    const showGoogleimg = false;

  return (
    <div>
      <CommunityComponent title={title} description={description} showGoogleimg={showGoogleimg} />
      
    </div>
  );
}