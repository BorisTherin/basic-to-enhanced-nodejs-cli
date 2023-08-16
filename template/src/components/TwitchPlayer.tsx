import { useRef, useEffect } from "preact/hooks"
import { h } from 'preact'

export function TwitchPlayer() {
    
    return (
        <>
         {//<!-- Add a placeholder for the Twitch embed -->
         }
        <div id="twitch-embed" class="absolute"></div>
        
        {//<!-- Load the Twitch embed script -->
        //<!-- Create a Twitch.Embed object that will render within the "twitch-embed" element. -->
         }
        
         {
            h(
                'script',
                { type: 'text/javascript'},
                // twitch embed script injection (workaround error handling)
                'let twscript = document.createElement(\'script\');'+
                'twscript.src = \'https://embed.twitch.tv/embed/v1.js\';'+
                'twscript.onload = () => { startTwitchPlayer() };'+
                'twscript.onerror = (err) => { console.log(\'twscript error\', err)};'+
                'document.getElementById(\'twitch-embed\').appendChild(twscript);'+
                // original Twitch-Obj calls as a start function
                'function startTwitchPlayer() { '+
                'var embed = new Twitch.Embed(\'twitch-embed\', {'+
                'width: 854,'+
                'height: 480,'+
                'channel: \'radiojaune\','+
                'layout: \'video-and-chat\','+
                'autoplay: false,'+
                'parent: [\'embed.example.com\', \'radiojaune.com\']'+
                '});'+
                'embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {'+
                'var player = embed.getPlayer();'+
                'player.play();'+
                '})};'
            )}
        </>      
    )
}


