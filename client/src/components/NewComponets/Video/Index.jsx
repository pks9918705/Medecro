import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { db } from '../firebase'; // Adjust the path as needed
import { ref, set, update } from 'firebase/database'; // Import necessary Firebase methods

function randomID(len) {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export const VideoIndex = () => {
  const { roomId } = useParams();
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const initiateMeeting = async () => {
      const appId = 1605738511;
      const serverSecret = "57b177f5f6a91386b4e4145795d405e6";
      const userId = randomID(5);
      const userName = randomID(5);
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, userId, userName);

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: videoContainerRef.current,
        sharedLinks: [
          {
            name: 'Personal link',
            url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomId=' + roomId,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        onJoinRoom: () => {
          console.log("Joined room");

          // Update Firebase Realtime Database when the call is started
          const callRef = ref(db, `videoCalls/${roomId}`);
          set(callRef, {
            patientId: roomId, // or any specific patient ID
            link: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomId=' + roomId,
            start: true, // Set to true when the call starts
          }).catch(error => console.error('Error updating Firebase:', error));
        },
        onLeaveRoom: () => {
          console.log("Left room");

          // Update Firebase Realtime Database when the call is ended
          const callRef = ref(db, `videoCalls/${roomId}`);
          update(callRef, {
            start: false, // Set to false when the call ends
          }).catch(error => console.error('Error updating Firebase:', error));
        }
      });
    };

    initiateMeeting();
  }, [roomId]);

  return (
    <div
      className="myCallContainer"
      ref={videoContainerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
};
