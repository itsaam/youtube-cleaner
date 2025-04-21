// ==UserScript==
// @name         Supprimer Shorts + Infos YouTube
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Supprime les Shorts, le menu Shorts et les actus (alerte info) sur YouTube
// @author       itsaam
// @match        https://www.youtube.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  function cleanYouTube() {
    document
      .querySelectorAll("ytd-rich-section-renderer")
      .forEach((section) => {
        const title = section.querySelector("#title");
        if (title && title.textContent.toLowerCase().includes("shorts")) {
          section.remove();
        }
      });

    document
      .querySelectorAll("ytd-rich-item-renderer, ytd-video-renderer")
      .forEach((item) => {
        const link = item.querySelector("a#thumbnail");
        if (link && link.href.includes("/shorts/")) {
          item.remove();
        }
      });

    document
      .querySelectorAll(
        "ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer"
      )
      .forEach((item) => {
        const link = item.querySelector("a");
        const text = item.textContent?.toLowerCase();
        if (
          (link && link.href.includes("/shorts")) ||
          (text && text.includes("shorts"))
        ) {
          item.remove();
        }
      });

    document.querySelectorAll("ytd-rich-shelf-renderer").forEach((shelf) => {
      const title = shelf.querySelector("#title");
      if (
        title &&
        /(alerte info|actu|actualité|info|infos|breaking news)/i.test(
          title.textContent
        )
      ) {
        shelf.remove();
      }
    });
  }

  const observer = new MutationObserver(() => {
    cleanYouTube();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Appel initial
  cleanYouTube();
})();
