/**
* Template Name: DevFolio - v2.3.0
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function($) {
  "use strict";

  var nav = $('nav');
  var navHeight = nav.outerHeight();

  $('.navbar-toggler').on('click', function() {
    if (!$('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  /*--/ Star ScrollTop /--*/
  $('.scrolltop-mf').on("click", function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1000);
  });

  /*--/ Star Counter /--*/
  $('.counter').counterUp({
    delay: 15,
    time: 2000
  });

  /*--/ Star Scrolling nav /--*/
  var mainNav_height = $('#mainNav').outerHeight() - 22;
  $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var scrollto = target.offset().top - mainNav_height;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      var scrollto_initial = $(initial_nav).offset().top - mainNav_height;
      $('html, body').animate({
        scrollTop: scrollto_initial
      }, 1000, "easeInOutExpo");
    }
  }

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll').on("click", function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: navHeight
  });
  /*--/ End Scrolling nav /--*/

  /*--/ Navbar Menu Reduce /--*/
  $(window).trigger('scroll');
  $(window).on('scroll', function() {
    var pixels = 50;
    var top = 1200;
    if ($(window).scrollTop() > pixels) {
      $('.navbar-expand-md, .navbar-expand-lg').addClass('navbar-reduce');
      $('.navbar-expand-md, .navbar-expand-lg').removeClass('navbar-trans');
    } else {
      if (!$('#navbarDefault').hasClass('show')) {
        $('.navbar-expand-md, .navbar-expand-lg').removeClass('navbar-reduce');
      }
      $('.navbar-expand-md, .navbar-expand-lg').addClass('navbar-trans');
    }
    if ($(window).scrollTop() > top) {
      $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
    } else {
      $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
    }
  });

  /*--/ Star Typed /--*/
  if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
    var typed = new Typed('.text-slider', {
      strings: typed_strings.split(','),
      typeSpeed: 80,
      loop: true,
      backDelay: 1100,
      backSpeed: 30
    });
  }

  /*--/ Testimonials owl /--*/
  $('#testimonial-mf').owlCarousel({
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox({
      'share': false
    });
  });

})(jQuery);

(function() {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
      return;
    }
    fn();
  }

  function setText(el, value) {
    if (el) el.textContent = value == null ? "" : String(value);
  }

  function initResponsiveNav() {
    document.documentElement.classList.add("js-ready");

    var menu = document.getElementById("navbarDefault");
    var customToggle = document.querySelector(".trust-mobile-menu-toggle");
    var mainNav = document.getElementById("mainNav");
    if (!menu || !customToggle) return;

    function setToggleState(isOpen) {
      customToggle.classList.toggle("collapsed", !isOpen);
      customToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    function setMenuOpen(isOpen) {
      if ($ && $.fn && $.fn.collapse) {
        $(menu).collapse(isOpen ? "show" : "hide");
      } else {
        menu.classList.toggle("show", isOpen);
        setToggleState(isOpen);
      }

      if (isOpen && mainNav) {
        mainNav.classList.add("navbar-reduce");
        mainNav.classList.remove("navbar-trans");
      }
    }

    customToggle.addEventListener("click", function() {
      setMenuOpen(!menu.classList.contains("show"));
    });

    if ($ && $.fn && $.fn.collapse) {
      $(menu).on("shown.bs.collapse", function() {
        setToggleState(true);
      });
      $(menu).on("hidden.bs.collapse", function() {
        setToggleState(false);
      });
    }

    menu.querySelectorAll(".js-scroll").forEach(function(link) {
      link.addEventListener("click", function() {
        setMenuOpen(false);
      });
    });
  }

  function initProjectSearch() {
    var input = document.getElementById("global-search");
    var button = document.getElementById("search-btn");
    var resultsEl = document.getElementById("search-results");
    if (!input || !resultsEl) return;

    var sitePages = [
      { title: "Home", category: "Section", url: "index.html#page-top", type: "Page" },
      { title: "About", category: "Section", url: "index.html#about", type: "Page" },
      { title: "Work", category: "Section", url: "index.html#work", type: "Page" },
      { title: "Trust Architecture", category: "Section", url: "index.html#trust-architecture", type: "Page" },
      { title: "Work With Me", category: "Section", url: "index.html#hire", type: "Page" },
      { title: "Projects", category: "Page", url: "projects.html", type: "Page" }
    ];

    var cards = Array.prototype.slice.call(document.querySelectorAll(".work-box"));
    cards.forEach(function(card, index) {
      if (!card.id) card.id = "project-card-" + index;
    });

    function hideResults() {
      resultsEl.style.display = "none";
    }

    function resetCards() {
      cards.forEach(function(card) {
        card.classList.remove("hidden");
      });
    }

    function makeResultItem(result) {
      var item = document.createElement("div");
      var title = document.createElement("div");
      var category = document.createElement("div");
      var type = document.createElement("div");

      item.className = "search-result-item";
      item.tabIndex = 0;
      item.setAttribute("role", "button");
      item.dataset.url = result.url || "";
      item.dataset.targetId = result.targetId || "";

      title.className = "search-result-title";
      category.className = "search-result-category";
      type.className = "search-result-type";

      setText(title, result.title);
      setText(category, result.category);
      setText(type, result.type);

      item.appendChild(title);
      item.appendChild(category);
      item.appendChild(type);
      return item;
    }

    function displayResults(results, searchTerm) {
      resultsEl.replaceChildren();

      if (!results.length) {
        var empty = document.createElement("div");
        empty.className = "no-results";
        setText(empty, 'No results found for "' + searchTerm + '"');
        resultsEl.appendChild(empty);
      } else {
        results.forEach(function(result) {
          resultsEl.appendChild(makeResultItem(result));
        });
      }

      resultsEl.style.display = "block";
    }

    function performSearch() {
      var searchTerm = input.value.toLowerCase().trim();
      if (!searchTerm) {
        hideResults();
        resetCards();
        return;
      }

      var projectResults = cards.reduce(function(acc, card) {
        var title = (card.getAttribute("data-title") || "").toLowerCase();
        var category = (card.getAttribute("data-category") || "").toLowerCase();
        if (title.indexOf(searchTerm) !== -1 || category.indexOf(searchTerm) !== -1) {
          acc.push({
            title: card.getAttribute("data-title") || "Project",
            category: card.getAttribute("data-category") || "Project",
            type: "Project",
            targetId: card.id
          });
        }
        return acc;
      }, []);

      var pageResults = sitePages.filter(function(page) {
        return page.title.toLowerCase().indexOf(searchTerm) !== -1 ||
          page.category.toLowerCase().indexOf(searchTerm) !== -1;
      });

      displayResults(projectResults.concat(pageResults), searchTerm);

      if (projectResults.length) {
        cards.forEach(function(card) {
          card.classList.add("hidden");
        });
        projectResults.forEach(function(result) {
          var card = document.getElementById(result.targetId);
          if (card) card.classList.remove("hidden");
        });
      } else {
        resetCards();
      }
    }

    function activateResult(item) {
      var url = item.dataset.url;
      var targetId = item.dataset.targetId;

      if (targetId) {
        var target = document.getElementById(targetId);
        if (target) {
          var top = target.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: top, behavior: "smooth" });
          target.classList.add("highlight");
          window.setTimeout(function() {
            target.classList.remove("highlight");
          }, 1800);
        }
        hideResults();
        return;
      }

      if (!url) return;
      if (url.indexOf("#") !== -1) {
        var parts = url.split("#");
        var anchor = parts[1];
        var sameIndex = !parts[0] || parts[0] === "index.html" || window.location.pathname.endsWith(parts[0]);
        var anchorTarget = anchor ? document.getElementById(anchor) : null;
        if (sameIndex && anchorTarget) {
          window.scrollTo({
            top: anchorTarget.getBoundingClientRect().top + window.pageYOffset - 100,
            behavior: "smooth"
          });
          hideResults();
          return;
        }
      }
      window.location.href = url;
    }

    input.addEventListener("input", performSearch);
    input.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        performSearch();
      }
    });
    if (button) button.addEventListener("click", performSearch);

    resultsEl.addEventListener("click", function(event) {
      var item = event.target.closest(".search-result-item");
      if (item) activateResult(item);
    });
    resultsEl.addEventListener("keydown", function(event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      var item = event.target.closest(".search-result-item");
      if (item) {
        event.preventDefault();
        activateResult(item);
      }
    });

    document.addEventListener("click", function(event) {
      if (!event.target.closest(".search-container")) hideResults();
    });

    cards.forEach(function(card) {
      card.addEventListener("click", function() {
        input.value = "";
        resetCards();
        hideResults();
      });
    });
  }

  function initTrustChatbot() {
    var panel = document.querySelector(".chatbot-sidebar");
    var form = document.getElementById("chatbot-form");
    var text = document.getElementById("chatbot-text");
    var send = document.getElementById("chatbot-send");
    var stop = document.getElementById("chatbot-stop");
    var loading = document.getElementById("chatbot-loading");
    var sendLabel = document.querySelector(".chatbot-send-label");
    var messages = document.getElementById("chatbot-messages");
    var toggle = document.getElementById("chatbot-toggle");
    var toggleIcon = document.getElementById("chatbot-toggle-icon");
    if (!panel || !form || !text || !send || !messages) return;

    var API_URL = "https://api.kazenai.com/personal/query-stream";
    var activeAbortController = null;
    var statusBubbleEl = null;
    var metricsPopoverCounter = 0;
    var currentAssistantBubble = null;
    var userStopped = false;

    function storageGet(key) {
      try {
        return window.localStorage ? window.localStorage.getItem(key) : null;
      } catch (_) {
        return null;
      }
    }

    function storageSet(key, value) {
      try {
        if (window.localStorage) window.localStorage.setItem(key, value);
      } catch (_) {}
    }

    function getSessionId() {
      var storageKey = "chatbot:session_id";
      var existing = storageGet(storageKey);
      if (existing) return existing;

      var nextId = "";
      if (window.crypto && typeof window.crypto.randomUUID === "function") {
        nextId = "sess-" + window.crypto.randomUUID();
      } else {
        nextId = "sess-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
      }
      storageSet(storageKey, nextId);
      return nextId;
    }

    var SESSION_ID = getSessionId();

    function updateChatTopOffset() {
      var nav = document.getElementById("mainNav");
      if (!nav) return;
      var rect = nav.getBoundingClientRect();
      var topPx = Math.max(0, Math.ceil(rect.bottom) + 10);
      document.documentElement.style.setProperty("--chatbot-top", topPx + "px");
    }

    function setMinimized(isMinimized, remember) {
      panel.classList.toggle("is-minimized", isMinimized);
      if (toggleIcon) setText(toggleIcon, isMinimized ? "+" : "-");
      if (toggle) {
        toggle.setAttribute("aria-label", isMinimized ? "Expand chat" : "Minimize chat");
        toggle.setAttribute("aria-expanded", isMinimized ? "false" : "true");
      }
      updateChatTopOffset();
      if (remember !== false) storageSet("chatbot:minimized", isMinimized ? "1" : "0");
      if (!isMinimized) window.setTimeout(function() { text.focus(); }, 80);
    }

    var savedMinimized = storageGet("chatbot:minimized");
    var mobileDefault = window.matchMedia && window.matchMedia("(max-width: 991px)").matches;
    setMinimized(savedMinimized == null ? mobileDefault : savedMinimized === "1", false);

    if (toggle) {
      toggle.addEventListener("click", function() {
        setMinimized(!panel.classList.contains("is-minimized"), true);
      });
    }

    window.addEventListener("resize", updateChatTopOffset);
    window.addEventListener("load", updateChatTopOffset);
    if (window.jQuery) {
      window.jQuery("#navbarDefault").on("shown.bs.collapse hidden.bs.collapse", updateChatTopOffset);
    }

    function scrollToBottom() {
      messages.scrollTop = messages.scrollHeight;
    }

    function setLoading(isLoading) {
      send.disabled = isLoading;
      text.disabled = isLoading;
      if (loading) loading.style.display = isLoading ? "inline-flex" : "none";
      if (sendLabel) setText(sendLabel, isLoading ? "Sending" : "Send");
      if (stop) stop.hidden = !isLoading;
    }

    function addMessage(role, value, opts) {
      var options = opts || {};
      var row = document.createElement("div");
      var bubble = document.createElement("div");
      row.className = "chatbot-msg " + role;
      bubble.className = "chatbot-bubble " + role + (options.error ? " error" : "");
      setText(bubble, value || "");
      row.appendChild(bubble);
      messages.appendChild(row);
      scrollToBottom();
      return bubble;
    }

    function ensureStatusBubble() {
      if (statusBubbleEl && statusBubbleEl.isConnected) return statusBubbleEl;
      statusBubbleEl = addMessage("status", "");
      return statusBubbleEl;
    }

    function setStatus(value) {
      var bubble = ensureStatusBubble();
      setText(bubble, value || "");
    }

    function clearStatus() {
      if (statusBubbleEl && statusBubbleEl.parentElement) {
        statusBubbleEl.parentElement.remove();
      }
      statusBubbleEl = null;
    }

    function coerceTextValue(value) {
      if (value == null) return "";
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return value.toString();
      }
      return "";
    }

    function coerceEventText(data) {
      var raw = (data || "").toString();
      var trimmed = raw.trim();
      if (!trimmed || trimmed === "[DONE]") return "";

      try {
        var obj = JSON.parse(trimmed);
        var candidates = [
          obj.token,
          obj.delta,
          obj.chunk,
          obj.text,
          obj.message,
          obj.content,
          obj.answer,
          obj.final_answer,
          obj.response,
          obj.data
        ];

        if (obj.delta && typeof obj.delta === "object") {
          candidates.unshift(obj.delta.content, obj.delta.text);
        }

        if (Array.isArray(obj.choices) && obj.choices.length) {
          var choice = obj.choices[0] || {};
          if (choice.delta && typeof choice.delta === "object") {
            candidates.unshift(choice.delta.content, choice.delta.text);
          }
          candidates.push(choice.text, choice.message && choice.message.content, choice.content);
        }

        for (var i = 0; i < candidates.length; i += 1) {
          var textValue = coerceTextValue(candidates[i]);
          if (textValue) return textValue;
        }

        return trimmed;
      } catch (_) {
        return raw;
      }
    }

    function tryExtractJsonObject(value) {
      var raw = (value || "").toString();
      var trimmed = raw.trim();
      if (!trimmed) return null;

      try {
        var parsed = JSON.parse(trimmed);
        if (parsed && typeof parsed === "object") return parsed;
      } catch (_) {}

      var first = trimmed.indexOf("{");
      var last = trimmed.lastIndexOf("}");
      if (first === -1 || last === -1 || last <= first) return null;
      try {
        var extracted = JSON.parse(trimmed.slice(first, last + 1));
        if (extracted && typeof extracted === "object") return extracted;
      } catch (_) {}
      return null;
    }

    function extractInlineMetrics(value) {
      var raw = (value || "").toString();
      var marker = /\n\s*(?:\*\*)?Metrics(?:\*\*)?:?/i.exec(raw);
      if (!marker || marker.index == null) return { text: raw, metrics: null };

      var visibleText = raw.slice(0, marker.index).trim();
      var metricsText = raw.slice(marker.index);
      var first = metricsText.indexOf("{");
      var last = metricsText.lastIndexOf("}");

      if (first !== -1 && last !== -1 && last > first) {
        try {
          var parsed = JSON.parse(metricsText.slice(first, last + 1));
          if (parsed && typeof parsed === "object") {
            return { text: visibleText, metrics: parsed };
          }
        } catch (_) {}
      }

      return { text: visibleText, metrics: null };
    }

    function clearLinks(bubbleEl) {
      if (!bubbleEl || !bubbleEl.parentElement) return;
      var existing = bubbleEl.parentElement.querySelector(".chatbot-links");
      if (existing) existing.remove();
    }

    function shouldOpenNewTab(url) {
      return url && !url.startsWith("#") && !url.startsWith("index.html#");
    }

    function renderLinks(bubbleEl, links) {
      clearLinks(bubbleEl);
      if (!bubbleEl || !bubbleEl.parentElement || !Array.isArray(links) || !links.length) return;

      var container = document.createElement("div");
      container.className = "chatbot-links";

      links.slice(0, 3).forEach(function(link) {
        if (!link || !link.url || !link.title) return;
        var anchor = document.createElement("a");
        anchor.className = "chatbot-link-btn";
        anchor.href = String(link.url);
        setText(anchor, link.title);
        if (shouldOpenNewTab(String(link.url))) {
          anchor.target = "_blank";
          anchor.rel = "noopener noreferrer";
        } else if (String(link.url).charAt(0) === "#") {
          anchor.addEventListener("click", function(event) {
            event.preventDefault();
            scrollToPageHash(String(link.url));
          });
        }
        container.appendChild(anchor);
      });

      if (container.childElementCount) {
        bubbleEl.parentElement.appendChild(container);
        scrollToBottom();
      }
    }

    function hideMetricsPopover(popoverEl) {
      if (!popoverEl) return;
      popoverEl.classList.remove("is-visible", "is-above");
      var bubbleEl = popoverEl.closest(".chatbot-bubble.assistant");
      var toggleEl = bubbleEl ? bubbleEl.querySelector(".chatbot-metrics-toggle") : null;
      if (toggleEl) toggleEl.setAttribute("aria-expanded", "false");
    }

    function hideAllMetricsPopovers() {
      document.querySelectorAll(".chatbot-metrics-popover.is-visible").forEach(hideMetricsPopover);
    }

    function clearMetrics(bubbleEl) {
      if (!bubbleEl) return;
      bubbleEl.classList.remove("has-metrics");
      bubbleEl.removeAttribute("data-metrics");
      var toggleEl = bubbleEl.querySelector(".chatbot-metrics-toggle");
      var popoverEl = bubbleEl.querySelector(".chatbot-metrics-popover");
      if (toggleEl) toggleEl.remove();
      if (popoverEl) popoverEl.remove();
    }

    function positionMetricsPopover(bubbleEl, popoverEl) {
      if (!bubbleEl || !popoverEl) return;
      popoverEl.classList.remove("is-above");
      var bubbleRect = bubbleEl.getBoundingClientRect();
      var panelRect = messages.getBoundingClientRect();
      var popoverHeight = popoverEl.offsetHeight;
      var spaceBelow = panelRect.bottom - bubbleRect.bottom;
      var spaceAbove = bubbleRect.top - panelRect.top;
      if (spaceBelow < popoverHeight + 12 && spaceAbove > spaceBelow) {
        popoverEl.classList.add("is-above");
      }
    }

    function setMetricsDetails(bubbleEl, metrics) {
      clearMetrics(bubbleEl);
      if (!bubbleEl || !metrics) return;

      try {
        var pretty = JSON.stringify(metrics, null, 2);
        var popoverId = "chatbot-metrics-" + (++metricsPopoverCounter);
        var toggleEl = document.createElement("button");
        var popoverEl = document.createElement("div");
        var titleEl = document.createElement("div");
        var metricsEl = document.createElement("pre");

        bubbleEl.classList.add("has-metrics");
        bubbleEl.dataset.metrics = pretty;

        toggleEl.type = "button";
        toggleEl.className = "chatbot-metrics-toggle";
        setText(toggleEl, "i");
        toggleEl.setAttribute("aria-label", "Show response metrics");
        toggleEl.setAttribute("aria-controls", popoverId);
        toggleEl.setAttribute("aria-expanded", "false");

        popoverEl.id = popoverId;
        popoverEl.className = "chatbot-metrics-popover";
        popoverEl.setAttribute("role", "dialog");
        popoverEl.setAttribute("aria-label", "Response metrics");

        titleEl.className = "chatbot-metrics-title";
        setText(titleEl, "Metrics");

        metricsEl.className = "chatbot-metrics-pre";
        setText(metricsEl, pretty);

        popoverEl.appendChild(titleEl);
        popoverEl.appendChild(metricsEl);

        toggleEl.addEventListener("click", function(event) {
          event.stopPropagation();
          var shouldOpen = !popoverEl.classList.contains("is-visible");
          hideAllMetricsPopovers();
          if (!shouldOpen) return;
          popoverEl.classList.add("is-visible");
          positionMetricsPopover(bubbleEl, popoverEl);
          toggleEl.setAttribute("aria-expanded", "true");
        });

        popoverEl.addEventListener("click", function(event) {
          event.stopPropagation();
        });

        bubbleEl.appendChild(toggleEl);
        bubbleEl.appendChild(popoverEl);
      } catch (_) {}
    }

    function mergeStreamText(currentText, incomingText) {
      var current = (currentText || "").toString();
      var next = (incomingText || "").toString();
      if (!next) return current;
      if (!current) return next;
      if (next === current) return current;
      if (next.startsWith(current)) return next;
      if (current.endsWith(next)) return current;
      return current + next;
    }

    function findSSEBoundary(buffer) {
      var match = /\r?\n\r?\n/.exec(buffer);
      if (!match || match.index == null) return -1;
      return match.index;
    }

    function waitForNextPaint() {
      return new Promise(function(resolve) {
        if (typeof window.requestAnimationFrame === "function") {
          window.requestAnimationFrame(function() { resolve(); });
          return;
        }
        window.setTimeout(resolve, 16);
      });
    }

    function parseSSEBlock(block) {
      var lines = block.split(/\r?\n/);
      var eventName = "message";
      var dataLines = [];

      lines.forEach(function(line) {
        if (!line) return;
        if (line.startsWith("event:")) {
          eventName = line.slice("event:".length).trim() || "message";
        } else if (line.startsWith("data:")) {
          dataLines.push(line.slice("data:".length));
        }
      });

      return { event: eventName, data: dataLines.join("\n") };
    }

    async function streamSSE(response, onEvent) {
      if (!response.body) throw new Error("This browser does not support streaming responses.");

      var reader = response.body.getReader();
      var decoder = new TextDecoder("utf-8");
      var buffer = "";

      while (true) {
        var chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });

        var idx = findSSEBoundary(buffer);
        while (idx !== -1) {
          var rawBlock = buffer.slice(0, idx).trim();
          var separatorMatch = /^\r?\n\r?\n/.exec(buffer.slice(idx));
          var separatorLength = separatorMatch ? separatorMatch[0].length : 2;
          buffer = buffer.slice(idx + separatorLength);
          if (rawBlock) await onEvent(parseSSEBlock(rawBlock));
          idx = findSSEBoundary(buffer);
        }
      }

      var trailing = buffer.trim();
      if (trailing) await onEvent(parseSSEBlock(trailing));
    }

    async function sendMessage(userMessage) {
      var clean = (userMessage || "").trim();
      if (!clean) return;

      if (panel.classList.contains("is-minimized")) setMinimized(false, true);
      hideAllMetricsPopovers();
      addMessage("user", clean);
      currentAssistantBubble = addMessage("assistant", "");
      setStatus("Connecting to assistant...");
      setLoading(true);
      userStopped = false;

      if (activeAbortController) activeAbortController.abort();
      activeAbortController = new AbortController();

      var hadErrorEvent = false;
      var lastMetrics = null;
      var lastLinks = null;
      var streamedText = "";

      function renderAssistantText(rawText) {
        var extracted = extractInlineMetrics(rawText);
        if (extracted.metrics) lastMetrics = extracted.metrics;
        setText(currentAssistantBubble, extracted.text);
        return extracted;
      }

      try {
        var res = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "text/event-stream"
          },
          body: JSON.stringify({ message: clean, session_id: SESSION_ID }),
          signal: activeAbortController.signal
        });

        if (!res.ok) throw new Error("Request failed (HTTP " + res.status + ").");
        setStatus("Connected. Drafting response...");

        await streamSSE(res, async function(evt) {
          var type = (evt.event || "message").toLowerCase();
          var structured = tryExtractJsonObject(evt.data);
          var eventText = coerceEventText(evt.data);
          var isFinalEvent = type === "final" || type === "done" || type === "complete" || type === "completed";

          if (structured && structured.metrics) lastMetrics = structured.metrics;
          if (structured && Array.isArray(structured.links)) lastLinks = structured.links;

          if (type === "searching") {
            setStatus(eventText ? "Searching evidence: " + eventText : "Searching evidence...");
            return;
          }

          if (type === "thinking") {
            setStatus(eventText ? "Reasoning: " + eventText : "Reasoning over evidence...");
            return;
          }

          if (type === "error") {
            hadErrorEvent = true;
            clearStatus();
            setText(currentAssistantBubble, "");
            addMessage("assistant", eventText || "The assistant hit an error. Please try again.", { error: true });
            if (activeAbortController) activeAbortController.abort();
            return;
          }

          if (isFinalEvent) {
            clearStatus();
            if (structured && structured.answer != null) {
              streamedText = structured.answer.toString();
              var finalAnswer = renderAssistantText(streamedText);
              setMetricsDetails(currentAssistantBubble, structured.metrics || finalAnswer.metrics || lastMetrics);
              renderLinks(currentAssistantBubble, structured.links || lastLinks);
            } else {
              streamedText = mergeStreamText(streamedText, eventText);
              var finalText = renderAssistantText(streamedText);
              setMetricsDetails(currentAssistantBubble, finalText.metrics || lastMetrics);
              renderLinks(currentAssistantBubble, lastLinks);
            }
            scrollToBottom();
            return;
          }

          if (eventText) {
            streamedText = mergeStreamText(streamedText, eventText);
            renderAssistantText(streamedText);
            scrollToBottom();
            await waitForNextPaint();
          }
        });

        clearStatus();
        if (!hadErrorEvent) {
          renderAssistantText(streamedText);
          setMetricsDetails(currentAssistantBubble, lastMetrics);
          renderLinks(currentAssistantBubble, lastLinks);
        }
        if (!hadErrorEvent && currentAssistantBubble && !currentAssistantBubble.textContent.trim()) {
          setText(currentAssistantBubble, "No response received. Please try again.");
        }
      } catch (err) {
        clearStatus();
        if (err && err.name === "AbortError" && userStopped) {
          if (currentAssistantBubble && !currentAssistantBubble.textContent.trim()) {
            setText(currentAssistantBubble, "Stopped before completion.");
          }
          return;
        }
        if (err && err.name === "AbortError") return;
        if (currentAssistantBubble) setText(currentAssistantBubble, "");
        addMessage("assistant", "I could not reach the assistant. Please try again, or email Dhavan directly at shah.dhavan09@gmail.com.", { error: true });
      } finally {
        setLoading(false);
        if (!panel.classList.contains("is-minimized")) text.focus();
        scrollToBottom();
      }
    }

    form.addEventListener("submit", function(event) {
      event.preventDefault();
      var message = text.value;
      text.value = "";
      autoResize();
      sendMessage(message);
    });

    text.addEventListener("keydown", function(event) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        form.requestSubmit();
      }
    });

    function autoResize() {
      text.style.height = "auto";
      text.style.height = Math.min(130, text.scrollHeight) + "px";
    }

    text.addEventListener("input", autoResize);
    autoResize();

    if (stop) {
      stop.addEventListener("click", function() {
        userStopped = true;
        if (activeAbortController) activeAbortController.abort();
      });
    }

    document.querySelectorAll(".chatbot-prompt").forEach(function(button) {
      button.addEventListener("click", function() {
        text.value = button.getAttribute("data-prompt") || "";
        autoResize();
        form.requestSubmit();
      });
    });

    document.addEventListener("click", function(event) {
      if (event.target.closest(".chatbot-metrics-toggle") || event.target.closest(".chatbot-metrics-popover")) return;
      hideAllMetricsPopovers();
    });

    document.addEventListener("keydown", function(event) {
      if (event.key === "Escape") hideAllMetricsPopovers();
    });
  }

  function scrollToPageHash(hash) {
    if (!hash || hash.charAt(0) !== "#") return;
    var target = document.querySelector(hash);
    if (!target) return;
    var nav = document.getElementById("mainNav");
    var offset = nav ? Math.max(nav.offsetHeight - 22, 0) : 70;
    var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top, behavior: "smooth" });
    if (history && history.replaceState) {
      history.replaceState(null, "", hash);
    }
  }

  function applyHireService(service) {
    var select = document.getElementById("hire-service");
    if (!select || !service) return;
    var options = Array.prototype.slice.call(select.options);
    var match = options.find(function(opt) {
      return opt.value === service;
    });
    if (match) select.value = service;
  }

  function initHireForm() {
    var form = document.getElementById("hire-form");
    if (!form) return;

    var params = new URLSearchParams(window.location.search);
    var serviceFromQuery = params.get("service");
    if (serviceFromQuery) applyHireService(serviceFromQuery);

    document.querySelectorAll("[data-hire-service]").forEach(function(el) {
      el.addEventListener("click", function() {
        applyHireService(el.getAttribute("data-hire-service"));
      });
    });

    form.addEventListener("submit", function(event) {
      event.preventDefault();

      var button = document.getElementById("hire-submit");
      var successEl = document.getElementById("hire-success");
      var errorEl = document.getElementById("hire-error");
      var name = document.getElementById("hire-name");
      var email = document.getElementById("hire-email");
      var message = document.getElementById("hire-message");

      if (!name || !email || !message || !button || !successEl || !errorEl) return;

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        setText(errorEl, "Please fill in your name, email, and project brief.");
        errorEl.style.display = "block";
        successEl.style.display = "none";
        return;
      }

      button.disabled = true;
      setText(button, "Sending...");
      successEl.style.display = "none";
      errorEl.style.display = "none";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      })
        .then(function(res) {
          if (res.ok) {
            successEl.style.display = "block";
            form.reset();
            return null;
          }
          return res.json().then(function(data) {
            throw new Error(data.error || "Submission failed");
          });
        })
        .catch(function() {
          setText(errorEl, "Something went wrong. Please email me directly at shah.dhavan09@gmail.com");
          errorEl.style.display = "block";
        })
        .finally(function() {
          button.disabled = false;
          button.innerHTML = "Request a fit call &rarr;";
        });
    });
  }

  ready(function() {
    initResponsiveNav();
    initProjectSearch();
    initTrustChatbot();
    initHireForm();
  });
})();
