document.addEventListener("DOMContentLoaded", () => {
	const liveVideo = document.querySelector(".livevideo-ronlou");
	const html_temp = () => {
		const nowPlayingHeading = document.querySelector(".dual-col");
		const iframe = liveVideo.querySelector(".rl-iframe-vid iframe") || liveVideo.querySelector(".rl-iframe-vid .youtube-iframe");
		const iframeSrc = iframe.dataset.src || iframe.src;
		const getSecondPath = iframeSrc.replace(/^https?:\/\//, "").split("/");
		const ytId = getSecondPath[2].split("?")[0];
		const liveChatTemp = (displayClass) => {
			return `
            <div class="chat-box" style="display: ${displayClass};">
              <iframe width="${iframe.offsetWidth}" height="${iframe.offsetHeight}" title="Ronna Lou LIVE | Philippine Matchmaker"
                src="https://www.youtube.com/live_chat?v=${ytId}&amp;embed_domain=${location.hostname}" style="border: none;border-radius: 20px;"></iframe>
            </div>
          `;
		};
		const chatboxDisplayState = getComputedStyle(nowPlayingHeading).display;
		return chatboxDisplayState === "block"
			? liveChatTemp("block")
			: liveChatTemp("none");
	};
	liveVideo.insertAdjacentHTML("beforeend", html_temp());
});
