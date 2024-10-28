const ariaDescribedBy = "aria-describedby", ariaExpanded = "aria-expanded", ariaHidden = "aria-hidden", ariaModal = "aria-modal", ariaPressed = "aria-pressed", ariaSelected = "aria-selected", focusEvent = "focus", focusinEvent = "focusin", focusoutEvent = "focusout", keydownEvent = "keydown", keyupEvent = "keyup", mouseclickEvent = "click", mousedownEvent = "mousedown", mousehoverEvent = "hover", mouseenterEvent = "mouseenter", mouseleaveEvent = "mouseleave", pointerdownEvent = "pointerdown", pointermoveEvent = "pointermove", pointerupEvent = "pointerup", touchstartEvent = "touchstart", dragstartEvent = "dragstart", focusableSelector = 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]', keyArrowDown = "ArrowDown", keyArrowUp = "ArrowUp", keyArrowLeft = "ArrowLeft", keyArrowRight = "ArrowRight", keyEscape = "Escape", transitionDuration = "transitionDuration", transitionDelay = "transitionDelay", transitionEndEvent = "transitionend", transitionProperty = "transitionProperty", isApple = () => {
  const appleBrands = /(iPhone|iPod|iPad)/;
  return navigator?.userAgentData?.brands.some(
    (x2) => appleBrands.test(x2.brand)
  ) || /* istanbul ignore next @preserve */
  appleBrands.test(
    navigator?.userAgent
  ) || !1;
}, noop = () => {
}, on = (element, eventName, listener, options) => {
  const ops = options || !1;
  element.addEventListener(
    eventName,
    listener,
    ops
  );
}, off = (element, eventName, listener, options) => {
  const ops = options || !1;
  element.removeEventListener(
    eventName,
    listener,
    ops
  );
}, getAttribute = (element, att) => element.getAttribute(att), hasAttribute = (element, att) => element.hasAttribute(att), setAttribute = (element, att, value) => element.setAttribute(att, value), removeAttribute = (element, att) => element.removeAttribute(att), addClass = (element, ...classNAME) => {
  element.classList.add(...classNAME);
}, removeClass = (element, ...classNAME) => {
  element.classList.remove(...classNAME);
}, hasClass = (element, classNAME) => element.classList.contains(classNAME), isObject = (obj) => obj != null && typeof obj == "object" || !1, isNode = (node) => isObject(node) && typeof node.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (x2) => node.nodeType === x2
) || !1, isHTMLElement = (element) => isNode(element) && element.nodeType === 1 || !1, componentData = /* @__PURE__ */ new Map(), Data = {
  data: componentData,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (element, component, instance) => {
    isHTMLElement(element) && (componentData.has(component) || componentData.set(component, /* @__PURE__ */ new Map()), componentData.get(component).set(element, instance));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (component) => componentData.get(component) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (element, component) => {
    if (!isHTMLElement(element) || !component) return null;
    const instanceMap = Data.getAllFor(component);
    return element && instanceMap && instanceMap.get(element) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (element, component) => {
    const instanceMap = Data.getAllFor(component);
    !instanceMap || !isHTMLElement(element) || (instanceMap.delete(element), instanceMap.size === 0 && componentData.delete(component));
  }
}, getInstance = (target, component) => Data.get(target, component), isString = (str) => typeof str == "string" || !1, isWindow = (obj) => isObject(obj) && obj.constructor.name === "Window" || !1, isDocument = (obj) => isNode(obj) && obj.nodeType === 9 || !1, getDocument = (node) => isWindow(node) ? node.document : isDocument(node) ? node : isNode(node) ? node.ownerDocument : globalThis.document, ObjectAssign = (obj, ...source) => Object.assign(obj, ...source), createElement = (param) => {
  if (!param) return;
  if (isString(param))
    return getDocument().createElement(param);
  const { tagName } = param, newElement = createElement(tagName);
  if (!newElement) return;
  const attr = { ...param };
  return delete attr.tagName, ObjectAssign(newElement, attr);
}, dispatchEvent = (element, event) => element.dispatchEvent(event), getElementStyle = (element, property) => {
  const computedStyle = getComputedStyle(element), prop = property.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return computedStyle.getPropertyValue(prop);
}, getElementTransitionDelay = (element) => {
  const propertyValue = getElementStyle(element, transitionProperty), delayValue = getElementStyle(element, transitionDelay), delayScale = delayValue.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, duration = propertyValue && propertyValue !== "none" ? parseFloat(delayValue) * delayScale : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(duration) ? (
    /* istanbul ignore next */
    0
  ) : duration;
}, getElementTransitionDuration = (element) => {
  const propertyValue = getElementStyle(element, transitionProperty), durationValue = getElementStyle(element, transitionDuration), durationScale = durationValue.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, duration = propertyValue && propertyValue !== "none" ? parseFloat(durationValue) * durationScale : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(duration) ? (
    /* istanbul ignore next */
    0
  ) : duration;
}, emulateTransitionEnd = (element, handler) => {
  let called = 0;
  const endEvent = new Event(transitionEndEvent), duration = getElementTransitionDuration(element), delay = getElementTransitionDelay(element);
  if (duration) {
    const transitionEndWrapper = (e2) => {
      e2.target === element && (handler.apply(element, [e2]), element.removeEventListener(transitionEndEvent, transitionEndWrapper), called = 1);
    };
    element.addEventListener(transitionEndEvent, transitionEndWrapper), setTimeout(() => {
      called || dispatchEvent(element, endEvent);
    }, duration + delay + 17);
  } else
    handler.apply(element, [endEvent]);
}, focus = (element, options) => element.focus(options), normalizeValue = (value) => ["true", !0].includes(value) ? !0 : ["false", !1].includes(value) ? !1 : ["null", "", null, void 0].includes(value) ? null : value !== "" && !Number.isNaN(+value) ? +value : value, ObjectEntries = (obj) => Object.entries(obj), toLowerCase = (source) => source.toLowerCase(), normalizeOptions = (element, defaultOps, inputOps, ns) => {
  const INPUT = { ...inputOps }, data = { ...element.dataset }, normalOps = { ...defaultOps }, dataOps = {}, title = "title";
  return ObjectEntries(data).forEach(([k2, v]) => {
    const key = typeof k2 == "string" && k2.includes(ns) ? k2.replace(ns, "").replace(
      /[A-Z]/g,
      (match) => toLowerCase(match)
    ) : (
      /* istanbul ignore next @preserve */
      k2
    );
    dataOps[key] = normalizeValue(v);
  }), ObjectEntries(INPUT).forEach(([k2, v]) => {
    INPUT[k2] = normalizeValue(v);
  }), ObjectEntries(defaultOps).forEach(([k2, v]) => {
    k2 in INPUT ? normalOps[k2] = INPUT[k2] : k2 in dataOps ? normalOps[k2] = dataOps[k2] : normalOps[k2] = k2 === title ? getAttribute(element, title) : v;
  }), normalOps;
}, ObjectKeys = (obj) => Object.keys(obj), createCustomEvent = (eventType, config) => {
  const OriginalCustomEvent = new CustomEvent(eventType, {
    cancelable: !0,
    bubbles: !0
  });
  return isObject(config) && ObjectAssign(OriginalCustomEvent, config), OriginalCustomEvent;
}, passiveHandler = { passive: !0 }, reflow = (element) => element.offsetHeight, setElementStyle = (element, styles) => {
  ObjectEntries(styles).forEach(([key, value]) => {
    if (value && isString(key) && key.includes("--"))
      element.style.setProperty(key, value);
    else {
      const propObject = {};
      propObject[key] = value, ObjectAssign(element.style, propObject);
    }
  });
}, isMap = (obj) => isObject(obj) && obj.constructor.name === "Map" || !1, isNumber = (num) => typeof num == "number" || !1, TimeCache = /* @__PURE__ */ new Map(), Timer = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (element, callback, delay, key) => {
    isHTMLElement(element) && (key && key.length ? (TimeCache.has(element) || TimeCache.set(element, /* @__PURE__ */ new Map()), TimeCache.get(element).set(key, setTimeout(callback, delay))) : TimeCache.set(element, setTimeout(callback, delay)));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (element, key) => {
    if (!isHTMLElement(element)) return null;
    const keyTimers = TimeCache.get(element);
    return key && keyTimers && isMap(keyTimers) ? keyTimers.get(key) || /* istanbul ignore next @preserve */
    null : isNumber(keyTimers) ? keyTimers : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (element, key) => {
    if (!isHTMLElement(element)) return;
    const keyTimers = TimeCache.get(element);
    key && key.length && isMap(keyTimers) ? (clearTimeout(keyTimers.get(key)), keyTimers.delete(key), keyTimers.size === 0 && TimeCache.delete(element)) : (clearTimeout(keyTimers), TimeCache.delete(element));
  }
}, querySelectorAll = (selector, parent) => (isNode(parent) ? parent : getDocument()).querySelectorAll(selector), focusTrapMap = /* @__PURE__ */ new Map();
function handleKeyboardNavigation(event) {
  const { shiftKey, code } = event, doc = getDocument(this), focusableElements = [
    ...querySelectorAll(focusableSelector, this)
  ].filter(
    (el) => !hasAttribute(el, "disabled") && !getAttribute(el, ariaHidden)
  );
  if (!focusableElements.length) return;
  const firstFocusable = focusableElements[0], lastFocusable = focusableElements[focusableElements.length - 1];
  code === "Tab" && (shiftKey && doc.activeElement === firstFocusable ? (lastFocusable.focus(), event.preventDefault()) : !shiftKey && doc.activeElement === lastFocusable && (firstFocusable.focus(), event.preventDefault()));
}
const hasFocusTrap = (target) => focusTrapMap.has(target) === !0, toggleFocusTrap = (target) => {
  const isCurrentlyTrapped = hasFocusTrap(target);
  (isCurrentlyTrapped ? off : on)(target, "keydown", handleKeyboardNavigation), isCurrentlyTrapped ? focusTrapMap.delete(target) : focusTrapMap.set(target, !0);
}, getBoundingClientRect = (element, includeScale) => {
  const { width, height, top, right, bottom, left } = element.getBoundingClientRect();
  let scaleX = 1, scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    const { offsetWidth: offsetWidth2, offsetHeight: offsetHeight2 } = element;
    scaleX = offsetWidth2 > 0 ? Math.round(width) / offsetWidth2 : (
      /* istanbul ignore next @preserve */
      1
    ), scaleY = offsetHeight2 > 0 ? Math.round(height) / offsetHeight2 : (
      /* istanbul ignore next @preserve */
      1
    );
  }
  return {
    width: width / scaleX,
    height: height / scaleY,
    top: top / scaleY,
    right: right / scaleX,
    bottom: bottom / scaleY,
    left: left / scaleX,
    x: left / scaleX,
    y: top / scaleY
  };
}, getDocumentBody = (node) => getDocument(node).body, getDocumentElement = (node) => getDocument(node).documentElement, isShadowRoot = (element) => isNode(element) && element.constructor.name === "ShadowRoot" || !1, getParentNode = (node) => node.nodeName === "HTML" ? node : isHTMLElement(node) && node.assignedSlot || // step into the shadow DOM of the parent of a slotted node
isNode(node) && node.parentNode || // DOM Element detected
isShadowRoot(node) && node.host || // ShadowRoot detected
getDocumentElement(node);
let elementUID = 0, elementMapUID = 0;
const elementIDMap = /* @__PURE__ */ new Map(), getUID = (element, key) => {
  let result = key ? elementUID : elementMapUID;
  if (key) {
    const elID = getUID(element), elMap = elementIDMap.get(elID) || /* @__PURE__ */ new Map();
    elementIDMap.has(elID) || elementIDMap.set(elID, elMap), isMap(elMap) && !elMap.has(key) ? (elMap.set(key, result), elementUID += 1) : result = elMap.get(key);
  } else {
    const elkey = element.id || element;
    elementIDMap.has(elkey) ? result = elementIDMap.get(elkey) : (elementIDMap.set(elkey, result), elementMapUID += 1);
  }
  return result;
}, getWindow = (node) => node ? isDocument(node) ? node.defaultView : isNode(node) ? node?.ownerDocument?.defaultView : node : window, isArray = (obj) => Array.isArray(obj) || !1, isElementInScrollRange = (element) => {
  if (!isNode(element)) return !1;
  const { top, bottom } = getBoundingClientRect(element), { clientHeight } = getDocumentElement(element);
  return top <= clientHeight && bottom >= 0;
}, isFunction = (fn) => typeof fn == "function" || !1, isNodeList = (obj) => isObject(obj) && obj.constructor.name === "NodeList" || !1, isRTL = (node) => getDocumentElement(node).dir === "rtl", isTableElement = (element) => isNode(element) && ["TABLE", "TD", "TH"].includes(element.nodeName) || !1, closest = (element, selector) => element ? element.closest(selector) || // break out of `ShadowRoot`
closest(element.getRootNode().host, selector) : null, querySelector = (selector, parent) => isHTMLElement(selector) ? selector : (isNode(parent) ? parent : getDocument()).querySelector(selector), getElementsByTagName = (selector, parent) => (isNode(parent) ? parent : getDocument()).getElementsByTagName(
  selector
), getElementsByClassName = (selector, parent) => (parent && isNode(parent) ? parent : getDocument()).getElementsByClassName(
  selector
), matches = (target, selector) => target.matches(selector), e = {}, f = (t) => {
  const { type: c, currentTarget: i } = t;
  [...e[c]].forEach(([n, s]) => {
    i === n && [...s].forEach(([o, a]) => {
      o.apply(n, [t]), typeof a == "object" && a.once && r(n, c, o, a);
    });
  });
}, E = (t, c, i, n) => {
  e[c] || (e[c] = /* @__PURE__ */ new Map());
  const s = e[c];
  s.has(t) || s.set(t, /* @__PURE__ */ new Map());
  const o = s.get(t), { size: a } = o;
  o.set(i, n);
  a || t.addEventListener(c, f, n);
}, r = (t, c, i, n) => {
  const s = e[c], o = s && s.get(t), a = o && o.get(i), d = a !== void 0 ? a : n;
  o && o.has(i) && o.delete(i);
  s && (!o || !o.size) && s.delete(t);
  (!s || !s.size) && delete e[c];
  (!o || !o.size) && t.removeEventListener(
    c,
    f,
    d
  );
}, fadeClass = "fade", showClass = "show", dataBsDismiss = "data-bs-dismiss", alertString = "alert", alertComponent = "Alert", version = "5.1.0", Version = version;
class BaseComponent {
  /**
   * @param target `HTMLElement` or selector string
   * @param config component instance options
   */
  constructor(target, config) {
    let element;
    try {
      if (isHTMLElement(target))
        element = target;
      else if (isString(target)) {
        if (element = querySelector(target), !element) throw Error(`"${target}" is not a valid selector.`);
      } else
        throw Error("your target is not an instance of HTMLElement.");
    } catch (e2) {
      throw Error(`${this.name} Error: ${e2.message}`);
    }
    const prevInstance = Data.get(element, this.name);
    prevInstance && prevInstance._toggleEventListeners(), this.element = element, this.options = this.defaults && ObjectKeys(this.defaults).length ? normalizeOptions(element, this.defaults, config || {}, "bs") : {}, Data.set(element, this.name, this);
  }
  // istanbul ignore next @preserve
  get version() {
    return Version;
  }
  // istanbul ignore next @preserve
  get name() {
    return "BaseComponent";
  }
  // istanbul ignore next @preserve
  get defaults() {
    return {};
  }
  /** just to have something to extend from */
  // istanbul ignore next @preserve coverage wise this isn't important
  _toggleEventListeners = () => {
  };
  /** Removes component from target element. */
  dispose() {
    Data.remove(this.element, this.name), ObjectKeys(this).forEach((prop) => {
      delete this[prop];
    });
  }
}
const alertSelector = `.${alertString}`, alertDismissSelector = `[${dataBsDismiss}="${alertString}"]`, getAlertInstance = (element) => getInstance(element, alertComponent), alertInitCallback = (element) => new Alert(element), closeAlertEvent = createCustomEvent(
  `close.bs.${alertString}`
), closedAlertEvent = createCustomEvent(
  `closed.bs.${alertString}`
), alertTransitionEnd = (self) => {
  const { element } = self;
  dispatchEvent(element, closedAlertEvent), self._toggleEventListeners(), self.dispose(), element.remove();
};
class Alert extends BaseComponent {
  static selector = alertSelector;
  static init = alertInitCallback;
  static getInstance = getAlertInstance;
  dismiss;
  constructor(target) {
    super(target), this.dismiss = querySelector(alertDismissSelector, this.element), this._toggleEventListeners(!0);
  }
  /** Returns component name string. */
  get name() {
    return alertComponent;
  }
  // ALERT PUBLIC METHODS
  // ====================
  /**
   * Public method that hides the `.alert` element from the user,
   * disposes the instance once animation is complete, then
   * removes the element from the DOM.
   */
  close = () => {
    const { element } = this;
    element && hasClass(element, showClass) && (dispatchEvent(element, closeAlertEvent), closeAlertEvent.defaultPrevented || (removeClass(element, showClass), hasClass(element, fadeClass) ? emulateTransitionEnd(element, () => alertTransitionEnd(this)) : alertTransitionEnd(this)));
  };
  /**
   * Toggle on / off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (add) => {
    const action = add ? E : r, { dismiss, close } = this;
    dismiss && action(dismiss, mouseclickEvent, close);
  };
  /** Remove the component from target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const activeClass = "active", dataBsToggle = "data-bs-toggle", buttonString = "button", buttonComponent = "Button", buttonSelector = `[${dataBsToggle}="${buttonString}"]`, getButtonInstance = (element) => getInstance(element, buttonComponent), buttonInitCallback = (element) => new Button(element);
class Button extends BaseComponent {
  static selector = buttonSelector;
  static init = buttonInitCallback;
  static getInstance = getButtonInstance;
  isActive = !1;
  /**
   * @param target usually a `.btn` element
   */
  constructor(target) {
    super(target);
    const { element } = this;
    this.isActive = hasClass(element, activeClass), setAttribute(element, ariaPressed, String(!!this.isActive)), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return buttonComponent;
  }
  // BUTTON PUBLIC METHODS
  // =====================
  /**
   * Toggles the state of the target button.
   *
   * @param e usually `click` Event object
   */
  toggle = (e2) => {
    e2 && e2.preventDefault();
    const { element, isActive } = this;
    !hasClass(element, "disabled") && !getAttribute(element, "disabled") && ((isActive ? removeClass : addClass)(element, activeClass), setAttribute(element, ariaPressed, isActive ? "false" : "true"), this.isActive = hasClass(element, activeClass));
  };
  // BUTTON PRIVATE METHOD
  // =====================
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (add) => {
    (add ? E : r)(this.element, mouseclickEvent, this.toggle);
  };
  /** Removes the `Button` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const dataBsTarget = "data-bs-target", carouselString = "carousel", carouselComponent = "Carousel", dataBsParent = "data-bs-parent", dataBsContainer = "data-bs-container", getTargetElement = (element) => {
  const targetAttr = [dataBsTarget, dataBsParent, dataBsContainer, "href"], doc = getDocument(element);
  return targetAttr.map((att) => {
    const attValue = getAttribute(element, att);
    return attValue ? att === dataBsParent ? closest(element, attValue) : querySelector(attValue, doc) : null;
  }).filter((x2) => x2)[0];
}, carouselSelector = `[data-bs-ride="${carouselString}"]`, carouselItem = `${carouselString}-item`, dataBsSlideTo = "data-bs-slide-to", dataBsSlide = "data-bs-slide", pausedClass = "paused", carouselDefaults = {
  pause: "hover",
  keyboard: !1,
  touch: !0,
  interval: 5e3
}, getCarouselInstance = (element) => getInstance(element, carouselComponent), carouselInitCallback = (element) => new Carousel(element);
let startX = 0, currentX = 0, endX = 0;
const carouselSlideEvent = createCustomEvent(`slide.bs.${carouselString}`), carouselSlidEvent = createCustomEvent(`slid.bs.${carouselString}`), carouselTransitionEndHandler = (self) => {
  const { index, direction, element, slides, options } = self;
  if (self.isAnimating) {
    const activeItem = getActiveIndex(self), orientation = direction === "left" ? "next" : "prev", directionClass = direction === "left" ? "start" : "end";
    addClass(slides[index], activeClass), removeClass(slides[index], `${carouselItem}-${orientation}`), removeClass(slides[index], `${carouselItem}-${directionClass}`), removeClass(slides[activeItem], activeClass), removeClass(slides[activeItem], `${carouselItem}-${directionClass}`), dispatchEvent(element, carouselSlidEvent), Timer.clear(element, dataBsSlide), self.cycle && !getDocument(element).hidden && options.interval && !self.isPaused && self.cycle();
  }
};
function carouselPauseHandler() {
  const self = getCarouselInstance(this);
  self && !self.isPaused && !Timer.get(this, pausedClass) && addClass(this, pausedClass);
}
function carouselResumeHandler() {
  const self = getCarouselInstance(this);
  self && self.isPaused && !Timer.get(this, pausedClass) && self.cycle();
}
function carouselIndicatorHandler(e2) {
  e2.preventDefault();
  const element = closest(this, carouselSelector) || getTargetElement(this), self = getCarouselInstance(element);
  if (self && !self.isAnimating) {
    const newIndex = +(getAttribute(this, dataBsSlideTo) || // istanbul ignore next @preserve
    0);
    this && !hasClass(this, activeClass) && // event target is not active
    !Number.isNaN(newIndex) && self.to(newIndex);
  }
}
function carouselControlsHandler(e2) {
  e2.preventDefault();
  const element = closest(this, carouselSelector) || getTargetElement(this), self = getCarouselInstance(element);
  if (self && !self.isAnimating) {
    const orientation = getAttribute(this, dataBsSlide);
    orientation === "next" ? self.next() : orientation === "prev" && self.prev();
  }
}
const carouselKeyHandler = ({ code, target }) => {
  const doc = getDocument(target), [element] = [...querySelectorAll(carouselSelector, doc)].filter(
    (x2) => isElementInScrollRange(x2)
  ), self = getCarouselInstance(element);
  if (self && !self.isAnimating && !/textarea|input/i.test(target.nodeName)) {
    const RTL = isRTL(element);
    code === (RTL ? keyArrowRight : keyArrowLeft) ? self.prev() : code === (RTL ? keyArrowLeft : keyArrowRight) && self.next();
  }
};
function carouselDragHandler(e2) {
  const { target } = e2, self = getCarouselInstance(this);
  self && self.isTouch && (self.indicator && !self.indicator.contains(target) || !self.controls.includes(target)) && (e2.stopImmediatePropagation(), e2.stopPropagation(), e2.preventDefault());
}
function carouselPointerDownHandler(e2) {
  const { target } = e2, self = getCarouselInstance(this);
  if (self && !self.isAnimating && !self.isTouch) {
    const { controls, indicators } = self;
    [...controls, ...indicators].every(
      (el) => el === target || el.contains(target)
    ) || (startX = e2.pageX, this.contains(target) && (self.isTouch = !0, toggleCarouselTouchHandlers(self, !0)));
  }
}
const carouselPointerMoveHandler = (e2) => {
  currentX = e2.pageX;
}, carouselPointerUpHandler = (e2) => {
  const { target } = e2, doc = getDocument(target), self = [...querySelectorAll(carouselSelector, doc)].map((c) => getCarouselInstance(c)).find((i) => i.isTouch);
  if (self) {
    const { element, index } = self, RTL = isRTL(element);
    endX = e2.pageX, self.isTouch = !1, toggleCarouselTouchHandlers(self), !doc.getSelection()?.toString().length && element.contains(target) && Math.abs(startX - endX) > 120 && (currentX < startX ? self.to(index + (RTL ? -1 : 1)) : currentX > startX && self.to(index + (RTL ? 1 : -1))), startX = 0, currentX = 0, endX = 0;
  }
}, activateCarouselIndicator = (self, index) => {
  const { indicators } = self;
  [...indicators].forEach((x2) => removeClass(x2, activeClass)), self.indicators[index] && addClass(indicators[index], activeClass);
}, toggleCarouselTouchHandlers = (self, add) => {
  const { element } = self, action = add ? E : r;
  action(
    getDocument(element),
    pointermoveEvent,
    carouselPointerMoveHandler,
    passiveHandler
  ), action(
    getDocument(element),
    pointerupEvent,
    carouselPointerUpHandler,
    passiveHandler
  );
}, getActiveIndex = (self) => {
  const { slides, element } = self, activeItem = querySelector(`.${carouselItem}.${activeClass}`, element);
  return isHTMLElement(activeItem) ? [...slides].indexOf(activeItem) : -1;
};
class Carousel extends BaseComponent {
  static selector = carouselSelector;
  static init = carouselInitCallback;
  static getInstance = getCarouselInstance;
  /**
   * @param target mostly a `.carousel` element
   * @param config instance options
   */
  constructor(target, config) {
    super(target, config);
    const { element } = this;
    this.direction = isRTL(element) ? "right" : "left", this.isTouch = !1, this.slides = getElementsByClassName(carouselItem, element);
    const { slides } = this;
    if (slides.length >= 2) {
      const activeIndex = getActiveIndex(this), transitionItem = [...slides].find(
        (s) => matches(s, `.${carouselItem}-next,.${carouselItem}-next`)
      );
      this.index = activeIndex;
      const doc = getDocument(element);
      this.controls = [
        ...querySelectorAll(`[${dataBsSlide}]`, element),
        ...querySelectorAll(
          `[${dataBsSlide}][${dataBsTarget}="#${element.id}"]`,
          doc
        )
      ].filter((c, i, ar) => i === ar.indexOf(c)), this.indicator = querySelector(`.${carouselString}-indicators`, element), this.indicators = [
        ...this.indicator ? querySelectorAll(`[${dataBsSlideTo}]`, this.indicator) : [],
        ...querySelectorAll(
          `[${dataBsSlideTo}][${dataBsTarget}="#${element.id}"]`,
          doc
        )
      ].filter((c, i, ar) => i === ar.indexOf(c));
      const { options } = this;
      this.options.interval = options.interval === !0 ? carouselDefaults.interval : options.interval, transitionItem ? this.index = [...slides].indexOf(transitionItem) : activeIndex < 0 && (this.index = 0, addClass(slides[0], activeClass), this.indicators.length && activateCarouselIndicator(this, 0)), this.indicators.length && activateCarouselIndicator(this, this.index), this._toggleEventListeners(!0), options.interval && this.cycle();
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return carouselComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return carouselDefaults;
  }
  /**
   * Check if instance is paused.
   */
  get isPaused() {
    return hasClass(this.element, pausedClass);
  }
  /**
   * Check if instance is animating.
   */
  get isAnimating() {
    return querySelector(
      `.${carouselItem}-next,.${carouselItem}-prev`,
      this.element
    ) !== null;
  }
  // CAROUSEL PUBLIC METHODS
  // =======================
  /** Slide automatically through items. */
  cycle() {
    const { element, options, isPaused, index } = this;
    Timer.clear(element, carouselString), isPaused && (Timer.clear(element, pausedClass), removeClass(element, pausedClass)), Timer.set(
      element,
      () => {
        this.element && !this.isPaused && !this.isTouch && isElementInScrollRange(element) && this.to(index + 1);
      },
      options.interval,
      carouselString
    );
  }
  /** Pause the automatic cycle. */
  pause() {
    const { element, options } = this;
    !this.isPaused && options.interval && (addClass(element, pausedClass), Timer.set(
      element,
      () => {
      },
      1,
      pausedClass
    ));
  }
  /** Slide to the next item. */
  next() {
    this.isAnimating || this.to(this.index + 1);
  }
  /** Slide to the previous item. */
  prev() {
    this.isAnimating || this.to(this.index - 1);
  }
  /**
   * Jump to the item with the `idx` index.
   *
   * @param idx the index of the item to jump to
   */
  to(idx) {
    const { element, slides, options } = this, activeItem = getActiveIndex(this), RTL = isRTL(element);
    let next = idx;
    if (!this.isAnimating && activeItem !== next && !Timer.get(element, dataBsSlide)) {
      activeItem < next || activeItem === 0 && next === slides.length - 1 ? this.direction = RTL ? "right" : "left" : (activeItem > next || activeItem === slides.length - 1 && next === 0) && (this.direction = RTL ? "left" : "right");
      const { direction } = this;
      next < 0 ? next = slides.length - 1 : next >= slides.length && (next = 0);
      const orientation = direction === "left" ? "next" : "prev", directionClass = direction === "left" ? "start" : "end", eventProperties = {
        relatedTarget: slides[next],
        from: activeItem,
        to: next,
        direction
      };
      ObjectAssign(carouselSlideEvent, eventProperties), ObjectAssign(carouselSlidEvent, eventProperties), dispatchEvent(element, carouselSlideEvent), carouselSlideEvent.defaultPrevented || (this.index = next, activateCarouselIndicator(this, next), getElementTransitionDuration(slides[next]) && hasClass(element, "slide") ? Timer.set(
        element,
        () => {
          addClass(slides[next], `${carouselItem}-${orientation}`), reflow(slides[next]), addClass(slides[next], `${carouselItem}-${directionClass}`), addClass(slides[activeItem], `${carouselItem}-${directionClass}`), emulateTransitionEnd(
            slides[next],
            () => this.slides && this.slides.length && carouselTransitionEndHandler(this)
          );
        },
        0,
        dataBsSlide
      ) : (addClass(slides[next], activeClass), removeClass(slides[activeItem], activeClass), Timer.set(
        element,
        () => {
          Timer.clear(element, dataBsSlide), element && options.interval && !this.isPaused && this.cycle(), dispatchEvent(element, carouselSlidEvent);
        },
        0,
        dataBsSlide
      )));
    }
  }
  /**
   * Toggles all event listeners for the `Carousel` instance.
   *
   * @param add when `TRUE` event listeners are added
   */
  _toggleEventListeners = (add) => {
    const { element, options, slides, controls, indicators } = this, { touch, pause, interval, keyboard } = options, action = add ? E : r;
    pause && interval && (action(element, mouseenterEvent, carouselPauseHandler), action(element, mouseleaveEvent, carouselResumeHandler)), touch && slides.length > 2 && (action(
      element,
      pointerdownEvent,
      carouselPointerDownHandler,
      passiveHandler
    ), action(element, touchstartEvent, carouselDragHandler, { passive: !1 }), action(element, dragstartEvent, carouselDragHandler, { passive: !1 })), controls.length && controls.forEach((arrow) => {
      arrow && action(arrow, mouseclickEvent, carouselControlsHandler);
    }), indicators.length && indicators.forEach((indicator) => {
      action(indicator, mouseclickEvent, carouselIndicatorHandler);
    }), keyboard && action(getDocument(element), keydownEvent, carouselKeyHandler);
  };
  /** Remove `Carousel` component from target. */
  dispose() {
    const { isAnimating } = this, clone = {
      ...this,
      isAnimating
    };
    this._toggleEventListeners(), super.dispose(), clone.isAnimating && emulateTransitionEnd(clone.slides[clone.index], () => {
      carouselTransitionEndHandler(clone);
    });
  }
}
const collapsingClass = "collapsing", collapseString = "collapse", collapseComponent = "Collapse", collapseSelector = `.${collapseString}`, collapseToggleSelector = `[${dataBsToggle}="${collapseString}"]`, collapseDefaults = { parent: null }, getCollapseInstance = (element) => getInstance(element, collapseComponent), collapseInitCallback = (element) => new Collapse(element), showCollapseEvent = createCustomEvent(`show.bs.${collapseString}`), shownCollapseEvent = createCustomEvent(`shown.bs.${collapseString}`), hideCollapseEvent = createCustomEvent(`hide.bs.${collapseString}`), hiddenCollapseEvent = createCustomEvent(`hidden.bs.${collapseString}`), expandCollapse = (self) => {
  const { element, parent, triggers } = self;
  dispatchEvent(element, showCollapseEvent), showCollapseEvent.defaultPrevented || (Timer.set(element, noop, 17), parent && Timer.set(parent, noop, 17), addClass(element, collapsingClass), removeClass(element, collapseString), setElementStyle(element, { height: `${element.scrollHeight}px` }), emulateTransitionEnd(element, () => {
    Timer.clear(element), parent && Timer.clear(parent), triggers.forEach((btn) => setAttribute(btn, ariaExpanded, "true")), removeClass(element, collapsingClass), addClass(element, collapseString), addClass(element, showClass), setElementStyle(element, { height: "" }), dispatchEvent(element, shownCollapseEvent);
  }));
}, collapseContent = (self) => {
  const { element, parent, triggers } = self;
  dispatchEvent(element, hideCollapseEvent), hideCollapseEvent.defaultPrevented || (Timer.set(element, noop, 17), parent && Timer.set(parent, noop, 17), setElementStyle(element, { height: `${element.scrollHeight}px` }), removeClass(element, collapseString), removeClass(element, showClass), addClass(element, collapsingClass), reflow(element), setElementStyle(element, { height: "0px" }), emulateTransitionEnd(element, () => {
    Timer.clear(element), parent && Timer.clear(parent), triggers.forEach((btn) => setAttribute(btn, ariaExpanded, "false")), removeClass(element, collapsingClass), addClass(element, collapseString), setElementStyle(element, { height: "" }), dispatchEvent(element, hiddenCollapseEvent);
  }));
}, collapseClickHandler = (e2) => {
  const { target } = e2, trigger = target && closest(target, collapseToggleSelector), element = trigger && getTargetElement(trigger), self = element && getCollapseInstance(element);
  self && self.toggle(), trigger && trigger.tagName === "A" && e2.preventDefault();
};
class Collapse extends BaseComponent {
  static selector = collapseSelector;
  static init = collapseInitCallback;
  static getInstance = getCollapseInstance;
  /**
   * @param target and `Element` that matches the selector
   * @param config instance options
   */
  constructor(target, config) {
    super(target, config);
    const { element, options } = this, doc = getDocument(element);
    this.triggers = [...querySelectorAll(collapseToggleSelector, doc)].filter(
      (btn) => getTargetElement(btn) === element
    ), this.parent = isHTMLElement(options.parent) ? options.parent : isString(options.parent) ? getTargetElement(element) || querySelector(options.parent, doc) : null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return collapseComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return collapseDefaults;
  }
  // COLLAPSE PUBLIC METHODS
  // =======================
  /** Hides the collapse. */
  hide() {
    const { triggers, element } = this;
    Timer.get(element) || (collapseContent(this), triggers.length && triggers.forEach((btn) => addClass(btn, `${collapseString}d`)));
  }
  /** Shows the collapse. */
  show() {
    const { element, parent, triggers } = this;
    let activeCollapse, activeCollapseInstance;
    parent && (activeCollapse = [
      ...querySelectorAll(`.${collapseString}.${showClass}`, parent)
    ].find((i) => getCollapseInstance(i)), activeCollapseInstance = activeCollapse && getCollapseInstance(activeCollapse)), (!parent || !Timer.get(parent)) && !Timer.get(element) && (activeCollapseInstance && activeCollapse !== element && (collapseContent(activeCollapseInstance), activeCollapseInstance.triggers.forEach((btn) => {
      addClass(btn, `${collapseString}d`);
    })), expandCollapse(this), triggers.length && triggers.forEach((btn) => removeClass(btn, `${collapseString}d`)));
  }
  /** Toggles the visibility of the collapse. */
  toggle() {
    hasClass(this.element, showClass) ? this.hide() : this.show();
  }
  /**
   * Toggles on/off the event listener(s) of the `Collapse` instance.
   *
   * @param add when `true`, the event listener is added
   */
  _toggleEventListeners = (add) => {
    const action = add ? E : r, { triggers } = this;
    triggers.length && triggers.forEach(
      (btn) => action(btn, mouseclickEvent, collapseClickHandler)
    );
  };
  /** Remove the `Collapse` component from the target `Element`. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const dropdownMenuClasses = ["dropdown", "dropup", "dropstart", "dropend"], dropdownComponent = "Dropdown", dropdownMenuClass = "dropdown-menu", isEmptyAnchor = (element) => {
  const parentAnchor = closest(element, "A");
  return element.tagName === "A" && // anchor href starts with #
  hasAttribute(element, "href") && getAttribute(element, "href").slice(-1) === "#" || // OR a child of an anchor with href starts with #
  parentAnchor && hasAttribute(parentAnchor, "href") && getAttribute(parentAnchor, "href").slice(-1) === "#";
}, [dropdownString, dropupString, dropstartString, dropendString] = dropdownMenuClasses, dropdownSelector = `[${dataBsToggle}="${dropdownString}"]`, getDropdownInstance = (element) => getInstance(element, dropdownComponent), dropdownInitCallback = (element) => new Dropdown(element), dropdownMenuEndClass = `${dropdownMenuClass}-end`, verticalClass = [dropdownString, dropupString], horizontalClass = [dropstartString, dropendString], menuFocusTags = ["A", "BUTTON"], dropdownDefaults = {
  offset: 5,
  // [number] 5(px)
  display: "dynamic"
  // [dynamic|static]
}, showDropdownEvent = createCustomEvent(
  `show.bs.${dropdownString}`
), shownDropdownEvent = createCustomEvent(
  `shown.bs.${dropdownString}`
), hideDropdownEvent = createCustomEvent(
  `hide.bs.${dropdownString}`
), hiddenDropdownEvent = createCustomEvent(`hidden.bs.${dropdownString}`), updatedDropdownEvent = createCustomEvent(`updated.bs.${dropdownString}`), styleDropdown = (self) => {
  const { element, menu, parentElement, options } = self, { offset } = options;
  if (getElementStyle(menu, "position") !== "static") {
    const RTL = isRTL(element), menuEnd = hasClass(menu, dropdownMenuEndClass);
    ["margin", "top", "bottom", "left", "right"].forEach((p2) => {
      const style = {};
      style[p2] = "", setElementStyle(menu, style);
    });
    let positionClass = dropdownMenuClasses.find(
      (c) => hasClass(parentElement, c)
    ) || // istanbul ignore next @preserve: fallback position
    dropdownString;
    const dropdownMargin = {
      dropdown: [offset, 0, 0],
      dropup: [0, 0, offset],
      dropstart: RTL ? [-1, 0, 0, offset] : [-1, offset, 0],
      dropend: RTL ? [-1, offset, 0] : [-1, 0, 0, offset]
    }, dropdownPosition = {
      dropdown: { top: "100%" },
      dropup: { top: "auto", bottom: "100%" },
      dropstart: RTL ? { left: "100%", right: "auto" } : { left: "auto", right: "100%" },
      dropend: RTL ? { left: "auto", right: "100%" } : { left: "100%", right: "auto" },
      menuStart: RTL ? { right: "0", left: "auto" } : { right: "auto", left: "0" },
      menuEnd: RTL ? { right: "auto", left: "0" } : { right: "0", left: "auto" }
    }, { offsetWidth: menuWidth, offsetHeight: menuHeight } = menu, { clientWidth, clientHeight } = getDocumentElement(element), {
      left: targetLeft,
      top: targetTop,
      width: targetWidth,
      height: targetHeight
    } = getBoundingClientRect(element), leftFullExceed = targetLeft - menuWidth - offset < 0, rightFullExceed = targetLeft + menuWidth + targetWidth + offset >= clientWidth, bottomExceed = targetTop + menuHeight + offset >= clientHeight, bottomFullExceed = targetTop + menuHeight + targetHeight + offset >= clientHeight, topExceed = targetTop - menuHeight - offset < 0, leftExceed = (!RTL && menuEnd || RTL && !menuEnd) && targetLeft + targetWidth - menuWidth < 0, rightExceed = (RTL && menuEnd || !RTL && !menuEnd) && targetLeft + menuWidth >= clientWidth;
    if (horizontalClass.includes(positionClass) && leftFullExceed && rightFullExceed && (positionClass = dropdownString), positionClass === dropstartString && (RTL ? rightFullExceed : leftFullExceed) && (positionClass = dropendString), positionClass === dropendString && (RTL ? leftFullExceed : rightFullExceed) && (positionClass = dropstartString), positionClass === dropupString && topExceed && !bottomFullExceed && (positionClass = dropdownString), positionClass === dropdownString && bottomFullExceed && !topExceed && (positionClass = dropupString), horizontalClass.includes(positionClass) && bottomExceed && ObjectAssign(dropdownPosition[positionClass], {
      top: "auto",
      bottom: 0
    }), verticalClass.includes(positionClass) && (leftExceed || rightExceed)) {
      let posAjust = { left: "auto", right: "auto" };
      !leftExceed && rightExceed && !RTL && (posAjust = { left: "auto", right: 0 }), leftExceed && !rightExceed && RTL && (posAjust = { left: 0, right: "auto" }), posAjust && ObjectAssign(dropdownPosition[positionClass], posAjust);
    }
    const margins = dropdownMargin[positionClass];
    setElementStyle(menu, {
      ...dropdownPosition[positionClass],
      margin: `${margins.map((x2) => x2 && `${x2}px`).join(" ")}`
    }), verticalClass.includes(positionClass) && menuEnd && menuEnd && setElementStyle(menu, dropdownPosition[!RTL && leftExceed || RTL && rightExceed ? "menuStart" : "menuEnd"]), dispatchEvent(parentElement, updatedDropdownEvent);
  }
}, getMenuItems = (menu) => [...menu.children].map((c) => {
  if (c && menuFocusTags.includes(c.tagName)) return c;
  const { firstElementChild } = c;
  return firstElementChild && menuFocusTags.includes(firstElementChild.tagName) ? firstElementChild : null;
}).filter((c) => c), toggleDropdownDismiss = (self) => {
  const { element, options, menu } = self, action = self.open ? E : r, doc = getDocument(element);
  action(doc, mouseclickEvent, dropdownDismissHandler), action(doc, focusEvent, dropdownDismissHandler), action(doc, keydownEvent, dropdownPreventScroll), action(doc, keyupEvent, dropdownKeyHandler), options.display === "dynamic" && (self.open ? self._observer.observe(menu) : self._observer.disconnect());
}, getCurrentOpenDropdown = (element) => {
  const currentParent = [...dropdownMenuClasses, "btn-group", "input-group"].map(
    (c) => getElementsByClassName(`${c} ${showClass}`, getDocument(element))
  ).find((x2) => x2.length);
  if (currentParent && currentParent.length)
    return [...currentParent[0].children].find(
      (x2) => dropdownMenuClasses.some((c) => c === getAttribute(x2, dataBsToggle))
    );
}, dropdownDismissHandler = (e2) => {
  const { target, type } = e2;
  if (target && isHTMLElement(target)) {
    const element = getCurrentOpenDropdown(target), self = element && getDropdownInstance(element);
    if (self) {
      const { parentElement, menu } = self, isForm = parentElement && parentElement.contains(target) && (target.tagName === "form" || closest(target, "form") !== null);
      [mouseclickEvent, mousedownEvent].includes(type) && isEmptyAnchor(target) && e2.preventDefault(), !isForm && type !== focusEvent && target !== element && target !== menu && self.hide();
    }
  }
}, dropdownClickHandler = (e2) => {
  const { target } = e2, element = target && closest(target, dropdownSelector), self = element && getDropdownInstance(element);
  self && (e2.stopPropagation(), self.toggle(), element && isEmptyAnchor(element) && e2.preventDefault());
}, dropdownPreventScroll = (e2) => {
  [keyArrowDown, keyArrowUp].includes(e2.code) && e2.preventDefault();
};
function dropdownKeyHandler(e2) {
  const { code } = e2, element = getCurrentOpenDropdown(this), self = element && getDropdownInstance(element), { activeElement } = element && getDocument(element);
  if (self && activeElement) {
    const { menu, open } = self, menuItems = getMenuItems(menu);
    if (menuItems && menuItems.length && [keyArrowDown, keyArrowUp].includes(code)) {
      let idx = menuItems.indexOf(activeElement);
      activeElement === element ? idx = 0 : code === keyArrowUp ? idx = idx > 1 ? idx - 1 : 0 : code === keyArrowDown && (idx = idx < menuItems.length - 1 ? idx + 1 : idx), menuItems[idx] && focus(menuItems[idx]);
    }
    keyEscape === code && open && (self.toggle(), focus(element));
  }
}
function dropdownIntersectionHandler(target) {
  const element = getCurrentOpenDropdown(target), self = element && getDropdownInstance(element);
  self && self.open && styleDropdown(self);
}
class Dropdown extends BaseComponent {
  static selector = dropdownSelector;
  static init = dropdownInitCallback;
  static getInstance = getDropdownInstance;
  /**
   * @param target Element or string selector
   * @param config the instance options
   */
  constructor(target, config) {
    super(target, config);
    const { parentElement } = this.element, [menu] = getElementsByClassName(
      dropdownMenuClass,
      parentElement
    );
    menu && (this.parentElement = parentElement, this.menu = menu, this._observer = new IntersectionObserver(
      ([entry]) => dropdownIntersectionHandler(entry.target),
      { threshold: 1 }
    ), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return dropdownComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return dropdownDefaults;
  }
  // DROPDOWN PUBLIC METHODS
  // =======================
  /** Shows/hides the dropdown menu to the user. */
  toggle() {
    this.open ? this.hide() : this.show();
  }
  /** Shows the dropdown menu to the user. */
  show() {
    const { element, open, menu, parentElement } = this;
    if (!open) {
      const currentElement = getCurrentOpenDropdown(element), currentInstance = currentElement && getDropdownInstance(currentElement);
      currentInstance && currentInstance.hide(), [showDropdownEvent, shownDropdownEvent, updatedDropdownEvent].forEach(
        (e2) => {
          e2.relatedTarget = element;
        }
      ), dispatchEvent(parentElement, showDropdownEvent), showDropdownEvent.defaultPrevented || (addClass(menu, showClass), addClass(parentElement, showClass), setAttribute(element, ariaExpanded, "true"), styleDropdown(this), this.open = !open, focus(element), toggleDropdownDismiss(this), dispatchEvent(parentElement, shownDropdownEvent));
    }
  }
  /** Hides the dropdown menu from the user. */
  hide() {
    const { element, open, menu, parentElement } = this;
    open && ([hideDropdownEvent, hiddenDropdownEvent].forEach((e2) => {
      e2.relatedTarget = element;
    }), dispatchEvent(parentElement, hideDropdownEvent), hideDropdownEvent.defaultPrevented || (removeClass(menu, showClass), removeClass(parentElement, showClass), setAttribute(element, ariaExpanded, "false"), this.open = !open, toggleDropdownDismiss(this), dispatchEvent(parentElement, hiddenDropdownEvent)));
  }
  /**
   * Toggles on/off the `click` event listener of the `Dropdown`.
   *
   * @param add when `true`, it will add the event listener
   */
  _toggleEventListeners = (add) => {
    (add ? E : r)(this.element, mouseclickEvent, dropdownClickHandler);
  };
  /** Removes the `Dropdown` component from the target element. */
  dispose() {
    this.open && this.hide(), this._toggleEventListeners(), super.dispose();
  }
}
const modalString = "modal", modalComponent = "Modal", offcanvasComponent = "Offcanvas", fixedTopClass = "fixed-top", fixedBottomClass = "fixed-bottom", stickyTopClass = "sticky-top", positionStickyClass = "position-sticky", getFixedItems = (parent) => [
  ...getElementsByClassName(fixedTopClass, parent),
  ...getElementsByClassName(fixedBottomClass, parent),
  ...getElementsByClassName(stickyTopClass, parent),
  ...getElementsByClassName(positionStickyClass, parent),
  ...getElementsByClassName("is-fixed", parent)
], resetScrollbar = (element) => {
  const bd = getDocumentBody(element);
  setElementStyle(bd, {
    paddingRight: "",
    overflow: ""
  });
  const fixedItems = getFixedItems(bd);
  fixedItems.length && fixedItems.forEach((fixed) => {
    setElementStyle(fixed, {
      paddingRight: "",
      marginRight: ""
    });
  });
}, measureScrollbar = (element) => {
  const { clientWidth } = getDocumentElement(element), { innerWidth } = getWindow(element);
  return Math.abs(innerWidth - clientWidth);
}, setScrollbar = (element, overflow) => {
  const bd = getDocumentBody(element), bodyPad = parseInt(getElementStyle(bd, "paddingRight"), 10), sbWidth = getElementStyle(bd, "overflow") === "hidden" && bodyPad ? 0 : measureScrollbar(element), fixedItems = getFixedItems(bd);
  overflow && (setElementStyle(bd, {
    overflow: "hidden",
    paddingRight: `${bodyPad + sbWidth}px`
  }), fixedItems.length && fixedItems.forEach((fixed) => {
    const itemPadValue = getElementStyle(fixed, "paddingRight");
    if (fixed.style.paddingRight = `${parseInt(itemPadValue, 10) + sbWidth}px`, [stickyTopClass, positionStickyClass].some((c) => hasClass(fixed, c))) {
      const itemMValue = getElementStyle(fixed, "marginRight");
      fixed.style.marginRight = `${parseInt(itemMValue, 10) - sbWidth}px`;
    }
  }));
}, offcanvasString = "offcanvas", popupContainer = createElement({
  tagName: "div",
  className: "popup-container"
}), appendPopup = (target, customContainer) => {
  const containerIsBody = isNode(customContainer) && customContainer.nodeName === "BODY", lookup = isNode(customContainer) && !containerIsBody ? customContainer : popupContainer, BODY = containerIsBody ? customContainer : getDocumentBody(target);
  isNode(target) && (lookup === popupContainer && BODY.append(popupContainer), lookup.append(target));
}, removePopup = (target, customContainer) => {
  const containerIsBody = isNode(customContainer) && customContainer.nodeName === "BODY", lookup = isNode(customContainer) && !containerIsBody ? customContainer : popupContainer;
  isNode(target) && (target.remove(), lookup === popupContainer && !popupContainer.children.length && popupContainer.remove());
}, hasPopup = (target, customContainer) => {
  const lookup = isNode(customContainer) && customContainer.nodeName !== "BODY" ? customContainer : popupContainer;
  return isNode(target) && lookup.contains(target);
}, backdropString = "backdrop", modalBackdropClass = `${modalString}-${backdropString}`, offcanvasBackdropClass = `${offcanvasString}-${backdropString}`, modalActiveSelector = `.${modalString}.${showClass}`, offcanvasActiveSelector = `.${offcanvasString}.${showClass}`, overlay = createElement("div"), getCurrentOpen = (element) => querySelector(
  `${modalActiveSelector},${offcanvasActiveSelector}`,
  getDocument(element)
), toggleOverlayType = (isModal) => {
  const targetClass = isModal ? modalBackdropClass : offcanvasBackdropClass;
  [modalBackdropClass, offcanvasBackdropClass].forEach((c) => {
    removeClass(overlay, c);
  }), addClass(overlay, targetClass);
}, appendOverlay = (element, hasFade, isModal) => {
  toggleOverlayType(isModal), appendPopup(overlay, getDocumentBody(element)), hasFade && addClass(overlay, fadeClass);
}, showOverlay = () => {
  hasClass(overlay, showClass) || (addClass(overlay, showClass), reflow(overlay));
}, hideOverlay = () => {
  removeClass(overlay, showClass);
}, removeOverlay = (element) => {
  getCurrentOpen(element) || (removeClass(overlay, fadeClass), removePopup(overlay, getDocumentBody(element)), resetScrollbar(element));
}, isVisible = (element) => isHTMLElement(element) && getElementStyle(element, "visibility") !== "hidden" && element.offsetParent !== null, modalSelector = `.${modalString}`, modalToggleSelector = `[${dataBsToggle}="${modalString}"]`, modalDismissSelector = `[${dataBsDismiss}="${modalString}"]`, modalStaticClass = `${modalString}-static`, modalDefaults = {
  backdrop: !0,
  keyboard: !0
}, getModalInstance = (element) => getInstance(element, modalComponent), modalInitCallback = (element) => new Modal(element), showModalEvent = createCustomEvent(
  `show.bs.${modalString}`
), shownModalEvent = createCustomEvent(
  `shown.bs.${modalString}`
), hideModalEvent = createCustomEvent(
  `hide.bs.${modalString}`
), hiddenModalEvent = createCustomEvent(
  `hidden.bs.${modalString}`
), setModalScrollbar = (self) => {
  const { element } = self, scrollbarWidth = measureScrollbar(element), { clientHeight, scrollHeight } = getDocumentElement(element), { clientHeight: modalHeight, scrollHeight: modalScrollHeight } = element, modalOverflow = modalHeight !== modalScrollHeight;
  if (!modalOverflow && scrollbarWidth) {
    const padStyle = { [isRTL(element) ? "paddingLeft" : "paddingRight"]: `${scrollbarWidth}px` };
    setElementStyle(element, padStyle);
  }
  setScrollbar(element, modalOverflow || clientHeight !== scrollHeight);
}, toggleModalDismiss = (self, add) => {
  const action = add ? E : r, { element } = self;
  action(element, mouseclickEvent, modalDismissHandler), action(getDocument(element), keydownEvent, modalKeyHandler), add ? self._observer.observe(element) : self._observer.disconnect();
}, afterModalHide = (self) => {
  const { triggers, element, relatedTarget } = self;
  removeOverlay(element), setElementStyle(element, { paddingRight: "", display: "" }), toggleModalDismiss(self);
  const focusElement = showModalEvent.relatedTarget || triggers.find(isVisible);
  focusElement && focus(focusElement), hiddenModalEvent.relatedTarget = relatedTarget, dispatchEvent(element, hiddenModalEvent), toggleFocusTrap(element);
}, afterModalShow = (self) => {
  const { element, relatedTarget } = self;
  focus(element), toggleModalDismiss(self, !0), shownModalEvent.relatedTarget = relatedTarget, dispatchEvent(element, shownModalEvent), toggleFocusTrap(element);
}, beforeModalShow = (self) => {
  const { element, hasFade } = self;
  setElementStyle(element, { display: "block" }), setModalScrollbar(self), getCurrentOpen(element) || setElementStyle(getDocumentBody(element), { overflow: "hidden" }), addClass(element, showClass), removeAttribute(element, ariaHidden), setAttribute(element, ariaModal, "true"), hasFade ? emulateTransitionEnd(element, () => afterModalShow(self)) : afterModalShow(self);
}, beforeModalHide = (self) => {
  const { element, options, hasFade } = self;
  options.backdrop && hasFade && hasClass(overlay, showClass) && !getCurrentOpen(element) ? (hideOverlay(), emulateTransitionEnd(overlay, () => afterModalHide(self))) : afterModalHide(self);
}, modalClickHandler = (e2) => {
  const { target } = e2, trigger = target && closest(target, modalToggleSelector), element = trigger && getTargetElement(trigger), self = element && getModalInstance(element);
  self && (trigger && trigger.tagName === "A" && e2.preventDefault(), self.relatedTarget = trigger, self.toggle());
}, modalKeyHandler = ({ code, target }) => {
  const element = querySelector(modalActiveSelector, getDocument(target)), self = element && getModalInstance(element);
  if (self) {
    const { options } = self;
    options.keyboard && code === keyEscape && // the keyboard option is enabled and the key is 27
    hasClass(element, showClass) && (self.relatedTarget = null, self.hide());
  }
}, modalDismissHandler = (e2) => {
  const { currentTarget } = e2, self = currentTarget && getModalInstance(currentTarget);
  if (self && currentTarget && !Timer.get(currentTarget)) {
    const { options, isStatic, modalDialog } = self, { backdrop } = options, { target } = e2, selectedText = getDocument(currentTarget)?.getSelection()?.toString().length, targetInsideDialog = modalDialog.contains(target), dismiss = target && closest(target, modalDismissSelector);
    isStatic && !targetInsideDialog ? Timer.set(
      currentTarget,
      () => {
        addClass(currentTarget, modalStaticClass), emulateTransitionEnd(modalDialog, () => staticTransitionEnd(self));
      },
      17
    ) : (dismiss || !selectedText && !isStatic && !targetInsideDialog && backdrop) && (self.relatedTarget = dismiss || null, self.hide(), e2.preventDefault());
  }
}, staticTransitionEnd = (self) => {
  const { element, modalDialog } = self, duration = (getElementTransitionDuration(modalDialog) || 0) + 17;
  removeClass(element, modalStaticClass), Timer.set(element, () => Timer.clear(element), duration);
};
class Modal extends BaseComponent {
  static selector = modalSelector;
  static init = modalInitCallback;
  static getInstance = getModalInstance;
  /**
   * @param target usually the `.modal` element
   * @param config instance options
   */
  constructor(target, config) {
    super(target, config);
    const { element } = this, modalDialog = querySelector(`.${modalString}-dialog`, element);
    modalDialog && (this.modalDialog = modalDialog, this.triggers = [
      ...querySelectorAll(modalToggleSelector, getDocument(element))
    ].filter(
      (btn) => getTargetElement(btn) === element
    ), this.isStatic = this.options.backdrop === "static", this.hasFade = hasClass(element, fadeClass), this.relatedTarget = null, this._observer = new ResizeObserver(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return modalComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return modalDefaults;
  }
  // MODAL PUBLIC METHODS
  // ====================
  /** Toggles the visibility of the modal. */
  toggle() {
    hasClass(this.element, showClass) ? this.hide() : this.show();
  }
  /** Shows the modal to the user. */
  show() {
    const { element, options, hasFade, relatedTarget } = this, { backdrop } = options;
    let overlayDelay = 0;
    if (!hasClass(element, showClass) && (showModalEvent.relatedTarget = relatedTarget || void 0, dispatchEvent(element, showModalEvent), !showModalEvent.defaultPrevented)) {
      const currentOpen = getCurrentOpen(element);
      if (currentOpen && currentOpen !== element) {
        const that = getModalInstance(currentOpen) || // istanbul ignore next @preserve
        getInstance(
          currentOpen,
          offcanvasComponent
        );
        that && that.hide();
      }
      backdrop ? (hasPopup(overlay) ? toggleOverlayType(!0) : appendOverlay(element, hasFade, !0), overlayDelay = getElementTransitionDuration(overlay), showOverlay(), setTimeout(() => beforeModalShow(this), overlayDelay)) : (beforeModalShow(this), currentOpen && hasClass(overlay, showClass) && hideOverlay());
    }
  }
  /** Hide the modal from the user. */
  hide() {
    const { element, hasFade, relatedTarget } = this;
    hasClass(element, showClass) && (hideModalEvent.relatedTarget = relatedTarget || void 0, dispatchEvent(element, hideModalEvent), hideModalEvent.defaultPrevented || (removeClass(element, showClass), setAttribute(element, ariaHidden, "true"), removeAttribute(element, ariaModal), hasFade ? emulateTransitionEnd(element, () => beforeModalHide(this)) : beforeModalHide(this)));
  }
  /**
   * Updates the modal layout.
   */
  update = () => {
    hasClass(this.element, showClass) && setModalScrollbar(this);
  };
  /**
   * Toggles on/off the `click` event listener of the `Modal` instance.
   *
   * @param add when `true`, event listener(s) is/are added
   */
  _toggleEventListeners = (add) => {
    const action = add ? E : r, { triggers } = this;
    triggers.length && triggers.forEach(
      (btn) => action(btn, mouseclickEvent, modalClickHandler)
    );
  };
  /** Removes the `Modal` component from target element. */
  dispose() {
    const clone = { ...this }, { modalDialog, hasFade } = clone, callback = () => setTimeout(() => super.dispose(), 17);
    this.hide(), this._toggleEventListeners(), hasFade ? emulateTransitionEnd(modalDialog, callback) : callback();
  }
}
const offcanvasSelector = `.${offcanvasString}`, offcanvasToggleSelector = `[${dataBsToggle}="${offcanvasString}"]`, offcanvasDismissSelector = `[${dataBsDismiss}="${offcanvasString}"]`, offcanvasTogglingClass = `${offcanvasString}-toggling`, offcanvasDefaults = {
  backdrop: !0,
  // boolean
  keyboard: !0,
  // boolean
  scroll: !1
  // boolean
}, getOffcanvasInstance = (element) => getInstance(element, offcanvasComponent), offcanvasInitCallback = (element) => new Offcanvas(element), showOffcanvasEvent = createCustomEvent(`show.bs.${offcanvasString}`), shownOffcanvasEvent = createCustomEvent(`shown.bs.${offcanvasString}`), hideOffcanvasEvent = createCustomEvent(`hide.bs.${offcanvasString}`), hiddenOffcanvasEvent = createCustomEvent(`hidden.bs.${offcanvasString}`), setOffCanvasScrollbar = (self) => {
  const { element } = self, { clientHeight, scrollHeight } = getDocumentElement(element);
  setScrollbar(element, clientHeight !== scrollHeight);
}, toggleOffCanvasDismiss = (self, add) => {
  const action = add ? E : r, doc = getDocument(self.element);
  action(doc, keydownEvent, offcanvasKeyDismissHandler), action(doc, mouseclickEvent, offcanvasDismissHandler);
}, beforeOffcanvasShow = (self) => {
  const { element, options } = self;
  options.scroll || (setOffCanvasScrollbar(self), setElementStyle(getDocumentBody(element), { overflow: "hidden" })), addClass(element, offcanvasTogglingClass), addClass(element, showClass), setElementStyle(element, { visibility: "visible" }), emulateTransitionEnd(element, () => showOffcanvasComplete(self));
}, beforeOffcanvasHide = (self) => {
  const { element, options } = self, currentOpen = getCurrentOpen(element);
  element.blur(), !currentOpen && options.backdrop && hasClass(overlay, showClass) && hideOverlay(), emulateTransitionEnd(element, () => hideOffcanvasComplete(self));
}, offcanvasTriggerHandler = (e2) => {
  const trigger = closest(e2.target, offcanvasToggleSelector), element = trigger && getTargetElement(trigger), self = element && getOffcanvasInstance(element);
  self && (self.relatedTarget = trigger, self.toggle(), trigger && trigger.tagName === "A" && e2.preventDefault());
}, offcanvasDismissHandler = (e2) => {
  const { target } = e2, element = querySelector(
    offcanvasActiveSelector,
    getDocument(target)
  ), offCanvasDismiss = querySelector(
    offcanvasDismissSelector,
    element
  ), self = element && getOffcanvasInstance(element);
  if (self) {
    const { options, triggers } = self, { backdrop } = options, trigger = closest(target, offcanvasToggleSelector), selection = getDocument(element).getSelection();
    (!overlay.contains(target) || backdrop !== "static") && (!(selection && selection.toString().length) && (!element.contains(target) && backdrop && // istanbul ignore next @preserve
    (!trigger || triggers.includes(target)) || offCanvasDismiss && offCanvasDismiss.contains(target)) && (self.relatedTarget = offCanvasDismiss && offCanvasDismiss.contains(target) ? offCanvasDismiss : null, self.hide()), trigger && trigger.tagName === "A" && e2.preventDefault());
  }
}, offcanvasKeyDismissHandler = ({ code, target }) => {
  const element = querySelector(
    offcanvasActiveSelector,
    getDocument(target)
  ), self = element && getOffcanvasInstance(element);
  self && self.options.keyboard && code === keyEscape && (self.relatedTarget = null, self.hide());
}, showOffcanvasComplete = (self) => {
  const { element } = self;
  removeClass(element, offcanvasTogglingClass), removeAttribute(element, ariaHidden), setAttribute(element, ariaModal, "true"), setAttribute(element, "role", "dialog"), dispatchEvent(element, shownOffcanvasEvent), toggleOffCanvasDismiss(self, !0), focus(element), toggleFocusTrap(element);
}, hideOffcanvasComplete = (self) => {
  const { element, triggers } = self;
  setAttribute(element, ariaHidden, "true"), removeAttribute(element, ariaModal), removeAttribute(element, "role"), setElementStyle(element, { visibility: "" });
  const visibleTrigger = showOffcanvasEvent.relatedTarget || triggers.find(isVisible);
  visibleTrigger && focus(visibleTrigger), removeOverlay(element), dispatchEvent(element, hiddenOffcanvasEvent), removeClass(element, offcanvasTogglingClass), toggleFocusTrap(element), getCurrentOpen(element) || toggleOffCanvasDismiss(self);
};
class Offcanvas extends BaseComponent {
  static selector = offcanvasSelector;
  static init = offcanvasInitCallback;
  static getInstance = getOffcanvasInstance;
  /**
   * @param target usually an `.offcanvas` element
   * @param config instance options
   */
  constructor(target, config) {
    super(target, config);
    const { element } = this;
    this.triggers = [
      ...querySelectorAll(offcanvasToggleSelector, getDocument(element))
    ].filter(
      (btn) => getTargetElement(btn) === element
    ), this.relatedTarget = null, this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return offcanvasComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return offcanvasDefaults;
  }
  // OFFCANVAS PUBLIC METHODS
  // ========================
  /** Shows or hides the offcanvas from the user. */
  toggle() {
    hasClass(this.element, showClass) ? this.hide() : this.show();
  }
  /** Shows the offcanvas to the user. */
  show() {
    const { element, options, relatedTarget } = this;
    let overlayDelay = 0;
    if (!hasClass(element, showClass) && (showOffcanvasEvent.relatedTarget = relatedTarget || void 0, shownOffcanvasEvent.relatedTarget = relatedTarget || void 0, dispatchEvent(element, showOffcanvasEvent), !showOffcanvasEvent.defaultPrevented)) {
      const currentOpen = getCurrentOpen(element);
      if (currentOpen && currentOpen !== element) {
        const that = getOffcanvasInstance(currentOpen) || // istanbul ignore next @preserve
        getInstance(
          currentOpen,
          modalComponent
        );
        that && that.hide();
      }
      options.backdrop ? (hasPopup(overlay) ? toggleOverlayType() : appendOverlay(element, !0), overlayDelay = getElementTransitionDuration(overlay), showOverlay(), setTimeout(() => beforeOffcanvasShow(this), overlayDelay)) : (beforeOffcanvasShow(this), currentOpen && hasClass(overlay, showClass) && hideOverlay());
    }
  }
  /** Hides the offcanvas from the user. */
  hide() {
    const { element, relatedTarget } = this;
    hasClass(element, showClass) && (hideOffcanvasEvent.relatedTarget = relatedTarget || void 0, hiddenOffcanvasEvent.relatedTarget = relatedTarget || void 0, dispatchEvent(element, hideOffcanvasEvent), hideOffcanvasEvent.defaultPrevented || (addClass(element, offcanvasTogglingClass), removeClass(element, showClass), beforeOffcanvasHide(this)));
  }
  /**
   * Toggles on/off the `click` event listeners.
   *
   * @param self the `Offcanvas` instance
   * @param add when *true*, listeners are added
   */
  _toggleEventListeners = (add) => {
    const action = add ? E : r;
    this.triggers.forEach(
      (btn) => action(btn, mouseclickEvent, offcanvasTriggerHandler)
    );
  };
  /** Removes the `Offcanvas` from the target element. */
  dispose() {
    const { element } = this, isOpen = hasClass(element, showClass), callback = () => setTimeout(() => super.dispose(), 1);
    this.hide(), this._toggleEventListeners(), isOpen ? emulateTransitionEnd(element, callback) : callback();
  }
}
const popoverString = "popover", popoverComponent = "Popover", tooltipString = "tooltip", getTipTemplate = (tipType) => {
  const isTooltip = tipType === tooltipString, bodyClass = isTooltip ? `${tipType}-inner` : `${tipType}-body`, header = isTooltip ? "" : `<h3 class="${tipType}-header"></h3>`, arrow = `<div class="${tipType}-arrow"></div>`, body = `<div class="${bodyClass}"></div>`;
  return `<div class="${tipType}" role="${tooltipString}">${header + arrow + body}</div>`;
}, tipClassPositions = {
  top: "top",
  bottom: "bottom",
  left: "start",
  right: "end"
}, styleTip = (self) => {
  const tipClasses = /\b(top|bottom|start|end)+/, { element, tooltip, container, options, arrow } = self;
  if (tooltip) {
    const tipPositions = { ...tipClassPositions }, RTL = isRTL(element);
    setElementStyle(tooltip, {
      // top: '0px', left: '0px', right: '', bottom: '',
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    const isPopover = self.name === popoverComponent, { offsetWidth: tipWidth, offsetHeight: tipHeight } = tooltip, { clientWidth: htmlcw, clientHeight: htmlch, offsetWidth: htmlow } = getDocumentElement(element);
    let { placement } = options;
    const { clientWidth: parentCWidth, offsetWidth: parentOWidth } = container, fixedParent = getElementStyle(
      container,
      "position"
    ) === "fixed", scrollbarWidth = Math.abs(fixedParent ? parentCWidth - parentOWidth : htmlcw - htmlow), leftBoundry = RTL && fixedParent ? scrollbarWidth : 0, rightBoundry = htmlcw - (RTL ? 0 : scrollbarWidth) - 1, {
      width: elemWidth,
      height: elemHeight,
      left: elemRectLeft,
      right: elemRectRight,
      top: elemRectTop
    } = getBoundingClientRect(element, !0), { x: x2, y } = {
      x: elemRectLeft,
      y: elemRectTop
    };
    setElementStyle(arrow, {
      top: "",
      left: "",
      right: "",
      bottom: ""
    });
    let topPosition = 0, bottomPosition = "", leftPosition = 0, rightPosition = "", arrowTop = "", arrowLeft = "", arrowRight = "";
    const arrowWidth = arrow.offsetWidth || 0, arrowHeight = arrow.offsetHeight || 0, arrowAdjust = arrowWidth / 2;
    let topExceed = elemRectTop - tipHeight - arrowHeight < 0, bottomExceed = elemRectTop + tipHeight + elemHeight + arrowHeight >= htmlch, leftExceed = elemRectLeft - tipWidth - arrowWidth < leftBoundry, rightExceed = elemRectLeft + tipWidth + elemWidth + arrowWidth >= rightBoundry;
    const horizontals = ["left", "right"], verticals = ["top", "bottom"];
    topExceed = horizontals.includes(placement) ? elemRectTop + elemHeight / 2 - tipHeight / 2 - arrowHeight < 0 : topExceed, bottomExceed = horizontals.includes(placement) ? elemRectTop + tipHeight / 2 + elemHeight / 2 + arrowHeight >= htmlch : bottomExceed, leftExceed = verticals.includes(placement) ? elemRectLeft + elemWidth / 2 - tipWidth / 2 < leftBoundry : leftExceed, rightExceed = verticals.includes(placement) ? elemRectLeft + tipWidth / 2 + elemWidth / 2 >= rightBoundry : rightExceed, placement = horizontals.includes(placement) && leftExceed && rightExceed ? "top" : placement, placement = placement === "top" && topExceed ? "bottom" : placement, placement = placement === "bottom" && bottomExceed ? "top" : placement, placement = placement === "left" && leftExceed ? "right" : placement, placement = placement === "right" && rightExceed ? "left" : placement, tooltip.className.includes(placement) || (tooltip.className = tooltip.className.replace(
      tipClasses,
      tipPositions[placement]
    )), horizontals.includes(placement) ? (placement === "left" ? leftPosition = x2 - tipWidth - (isPopover ? arrowWidth : 0) : leftPosition = x2 + elemWidth + (isPopover ? arrowWidth : 0), topExceed && bottomExceed ? (topPosition = 0, bottomPosition = 0, arrowTop = elemRectTop + elemHeight / 2 - arrowHeight / 2) : topExceed ? (topPosition = y, bottomPosition = "", arrowTop = elemHeight / 2 - arrowWidth) : bottomExceed ? (topPosition = y - tipHeight + elemHeight, bottomPosition = "", arrowTop = tipHeight - elemHeight / 2 - arrowWidth) : (topPosition = y - tipHeight / 2 + elemHeight / 2, arrowTop = tipHeight / 2 - arrowHeight / 2)) : verticals.includes(placement) && (placement === "top" ? topPosition = y - tipHeight - (isPopover ? arrowHeight : 0) : topPosition = y + elemHeight + (isPopover ? arrowHeight : 0), leftExceed ? (leftPosition = 0, arrowLeft = x2 + elemWidth / 2 - arrowAdjust) : rightExceed ? (leftPosition = "auto", rightPosition = 0, arrowRight = elemWidth / 2 + rightBoundry - elemRectRight - arrowAdjust) : (leftPosition = x2 - tipWidth / 2 + elemWidth / 2, arrowLeft = tipWidth / 2 - arrowAdjust)), setElementStyle(tooltip, {
      top: `${topPosition}px`,
      bottom: bottomPosition === "" ? "" : `${bottomPosition}px`,
      left: leftPosition === "auto" ? leftPosition : `${leftPosition}px`,
      right: rightPosition !== "" ? `${rightPosition}px` : ""
    }), isHTMLElement(arrow) && (arrowTop !== "" && (arrow.style.top = `${arrowTop}px`), arrowLeft !== "" ? arrow.style.left = `${arrowLeft}px` : arrowRight !== "" && (arrow.style.right = `${arrowRight}px`));
    const updatedTooltipEvent = createCustomEvent(
      `updated.bs.${toLowerCase(self.name)}`
    );
    dispatchEvent(element, updatedTooltipEvent);
  }
}, tooltipDefaults = {
  template: getTipTemplate(tooltipString),
  title: "",
  customClass: "",
  trigger: "hover focus",
  placement: "top",
  sanitizeFn: void 0,
  animation: !0,
  delay: 200,
  container: document.body,
  content: "",
  dismissible: !1,
  btnClose: ""
}, p = (i) => i != null && typeof i == "object" || !1, k = (i) => p(i) && typeof i.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (t) => i.nodeType === t
) || !1, _ = (i) => k(i) && i.nodeType === 1 || !1, B = (i) => typeof i == "function" || !1, m = "PositionObserver Error";
class x {
  entries;
  _tick;
  _root;
  _callback;
  /**
   * The constructor takes two arguments, a `callback`, which is called
   * whenever the position of an observed element changes and an `options` object.
   * The callback function should take an array of `PositionObserverEntry` objects
   * as its only argument, but it's not required.
   *
   * @param callback the callback that applies to all targets of this observer
   * @param options the options of this observer
   */
  constructor(t, n) {
    if (!B(t))
      throw new Error(`${m}: ${t} is not a function.`);
    this.entries = [], this._callback = t, this._root = _(n?.root) ? n.root : document?.documentElement, this._tick = 0;
  }
  /**
   * Start observing the position of the specified element.
   * If the element is not currently attached to the DOM,
   * it will NOT be added to the entries.
   * @param target
   */
  observe = (t) => {
    if (!_(t))
      throw new Error(
        `${m}: ${t} is not an instance of HTMLElement.`
      );
    if (!this._root.contains(t)) return;
    const { clientWidth: n, clientHeight: o } = this._root, h = t.getBoundingClientRect(), { left: l, top: u, bottom: e2, right: s, width: r2, height: c } = h, a = u > 1 - c && l > 1 - r2 && e2 <= o + c - 1 && s <= n + r2 - 1;
    this.entries.push({ target: t, boundingBox: h, isVisible: a }), this._tick || (this._tick = requestAnimationFrame(this._runCallback));
  };
  /**
   * Stop observing the position of the specified element.
   * @param target
   */
  unobserve = (t) => {
    const n = this.entries.findIndex((o) => o.target === t);
    this.entries.splice(n, 1);
  };
  /**
   * Private method responsible for all the heavy duty.
   */
  _runCallback = () => {
    if (!this.entries.length) return;
    const t = [], { clientWidth: n, clientHeight: o } = this._root;
    this.entries.forEach((h, l) => {
      const { target: u, boundingBox: e2 } = h, s = u.getBoundingClientRect(), { left: r2, top: c, bottom: a, right: d, width: b, height: f2 } = s;
      if (e2.left !== r2 || e2.top !== c || e2.right !== d || e2.bottom !== a) {
        const g = c > 1 - f2 && r2 > 1 - b && a <= o + f2 - 1 && d <= n + b - 1;
        this.entries[l].boundingBox = s, this.entries[l].isVisible = g, t.push({ target: u, boundingBox: s, isVisible: g });
      }
    }), t.length && this._callback(t), requestAnimationFrame(this._runCallback);
  };
  /**
   * Immediately stop observing all elements.
   */
  disconnect = () => {
    cancelAnimationFrame(this._tick), this.entries.length = 0, this._tick = 0;
  };
}
const dataOriginalTitle = "data-original-title", tooltipComponent = "Tooltip", setHtml = (element, content, sanitizeFn) => {
  if (isString(content) && content.length) {
    let dirty = content.trim();
    isFunction(sanitizeFn) && (dirty = sanitizeFn(dirty));
    const tempDocument = new DOMParser().parseFromString(dirty, "text/html");
    element.append(...tempDocument.body.childNodes);
  } else isHTMLElement(content) ? element.append(content) : (isNodeList(content) || isArray(content) && content.every(isNode)) && element.append(...content);
}, createTip = (self) => {
  const isTooltip = self.name === tooltipComponent, { id, element, options } = self, {
    title,
    placement,
    template,
    animation,
    customClass,
    sanitizeFn,
    dismissible,
    content,
    btnClose
  } = options, tipString = isTooltip ? tooltipString : popoverString, tipPositions = { ...tipClassPositions };
  let titleParts = [], contentParts = [];
  isRTL(element) && (tipPositions.left = "end", tipPositions.right = "start");
  const placementClass = `bs-${tipString}-${tipPositions[placement]}`;
  let tooltipTemplate;
  if (isHTMLElement(template))
    tooltipTemplate = template;
  else {
    const htmlMarkup = createElement("div");
    setHtml(htmlMarkup, template, sanitizeFn), tooltipTemplate = htmlMarkup.firstChild;
  }
  self.tooltip = isHTMLElement(tooltipTemplate) ? tooltipTemplate.cloneNode(!0) : void 0;
  const { tooltip } = self;
  if (tooltip) {
    setAttribute(tooltip, "id", id), setAttribute(tooltip, "role", tooltipString);
    const bodyClass = isTooltip ? `${tooltipString}-inner` : `${popoverString}-body`, tooltipHeader = isTooltip ? null : querySelector(`.${popoverString}-header`, tooltip), tooltipBody = querySelector(`.${bodyClass}`, tooltip);
    self.arrow = querySelector(`.${tipString}-arrow`, tooltip);
    const { arrow } = self;
    if (isHTMLElement(title)) titleParts = [title.cloneNode(!0)];
    else {
      const tempTitle = createElement("div");
      setHtml(tempTitle, title, sanitizeFn), titleParts = [...tempTitle.childNodes];
    }
    if (isHTMLElement(content)) contentParts = [content.cloneNode(!0)];
    else {
      const tempContent = createElement("div");
      setHtml(tempContent, content, sanitizeFn), contentParts = [...tempContent.childNodes];
    }
    if (dismissible)
      if (title)
        if (isHTMLElement(btnClose))
          titleParts = [...titleParts, btnClose.cloneNode(!0)];
        else {
          const tempBtn = createElement("div");
          setHtml(tempBtn, btnClose, sanitizeFn), titleParts = [...titleParts, tempBtn.firstChild];
        }
      else if (tooltipHeader && tooltipHeader.remove(), isHTMLElement(btnClose))
        contentParts = [...contentParts, btnClose.cloneNode(!0)];
      else {
        const tempBtn = createElement("div");
        setHtml(tempBtn, btnClose, sanitizeFn), contentParts = [...contentParts, tempBtn.firstChild];
      }
    isTooltip ? title && tooltipBody && setHtml(tooltipBody, title, sanitizeFn) : (title && tooltipHeader && setHtml(tooltipHeader, titleParts, sanitizeFn), content && tooltipBody && setHtml(tooltipBody, contentParts, sanitizeFn), self.btn = querySelector(".btn-close", tooltip) || void 0), addClass(tooltip, "position-fixed"), addClass(arrow, "position-absolute"), hasClass(tooltip, tipString) || addClass(tooltip, tipString), animation && !hasClass(tooltip, fadeClass) && addClass(tooltip, fadeClass), customClass && !hasClass(tooltip, customClass) && addClass(tooltip, customClass), hasClass(tooltip, placementClass) || addClass(tooltip, placementClass);
  }
}, getElementContainer = (element) => {
  const majorBlockTags = ["HTML", "BODY"], containers = [];
  let { parentNode } = element;
  for (; parentNode && !majorBlockTags.includes(parentNode.nodeName); )
    parentNode = getParentNode(parentNode), isShadowRoot(parentNode) || isTableElement(parentNode) || containers.push(parentNode);
  return containers.find((c, i) => getElementStyle(c, "position") !== "relative" && containers.slice(i + 1).every(
    (r2) => getElementStyle(r2, "position") === "static"
  ) ? c : null) || // istanbul ignore next: optional guard
  getDocument(element).body;
}, tooltipSelector = `[${dataBsToggle}="${tooltipString}"],[data-tip="${tooltipString}"]`, titleAttr = "title";
let getTooltipInstance = (element) => getInstance(element, tooltipComponent);
const tooltipInitCallback = (element) => new Tooltip(element), removeTooltip = (self) => {
  const { element, tooltip, container, offsetParent } = self;
  removeAttribute(element, ariaDescribedBy), removePopup(
    tooltip,
    container === offsetParent ? container : offsetParent
  );
}, hasTip = (self) => {
  const { tooltip, container, offsetParent } = self;
  return tooltip && hasPopup(tooltip, container === offsetParent ? container : offsetParent);
}, disposeTooltipComplete = (self, callback) => {
  const { element } = self;
  self._toggleEventListeners(), hasAttribute(element, dataOriginalTitle) && self.name === tooltipComponent && toggleTooltipTitle(self), callback && callback();
}, toggleTooltipAction = (self, add) => {
  const action = add ? E : r, { element } = self;
  action(
    getDocument(element),
    touchstartEvent,
    self.handleTouch,
    passiveHandler
  );
}, tooltipShownAction = (self) => {
  const { element } = self, shownTooltipEvent = createCustomEvent(
    `shown.bs.${toLowerCase(self.name)}`
  );
  toggleTooltipAction(self, !0), dispatchEvent(element, shownTooltipEvent), Timer.clear(element, "in");
}, tooltipHiddenAction = (self) => {
  const { element } = self, hiddenTooltipEvent = createCustomEvent(
    `hidden.bs.${toLowerCase(self.name)}`
  );
  toggleTooltipAction(self), removeTooltip(self), dispatchEvent(element, hiddenTooltipEvent), Timer.clear(element, "out");
}, toggleTooltipOpenHandlers = (self, add) => {
  const action = add ? E : r, { element } = self, parentModal = closest(element, `.${modalString}`), parentOffcanvas = closest(element, `.${offcanvasString}`);
  add ? self._observer.observe(self.element) : self._observer.disconnect(), parentModal && action(parentModal, `hide.bs.${modalString}`, self.handleHide), parentOffcanvas && action(parentOffcanvas, `hide.bs.${offcanvasString}`, self.handleHide);
}, toggleTooltipTitle = (self, content) => {
  const titleAtt = [dataOriginalTitle, titleAttr], { element } = self;
  setAttribute(
    element,
    titleAtt[content ? 0 : 1],
    content || getAttribute(element, titleAtt[0]) || // istanbul ignore next @preserve
    ""
  ), removeAttribute(element, titleAtt[content ? 1 : 0]);
};
class Tooltip extends BaseComponent {
  static selector = tooltipSelector;
  static init = tooltipInitCallback;
  static getInstance = getTooltipInstance;
  static styleTip = styleTip;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(target, config) {
    super(target, config);
    const { element } = this, isTooltip = this.name === tooltipComponent, tipString = isTooltip ? tooltipString : popoverString, tipComponent = isTooltip ? tooltipComponent : popoverComponent;
    getTooltipInstance = (elem) => getInstance(elem, tipComponent), this.enabled = !0, this.id = `${tipString}-${getUID(element, tipString)}`;
    const { options } = this;
    !options.title && isTooltip || !isTooltip && !options.content || (ObjectAssign(tooltipDefaults, { titleAttr: "" }), hasAttribute(element, titleAttr) && isTooltip && typeof options.title == "string" && toggleTooltipTitle(this, options.title), this.container = getElementContainer(element), this.offsetParent = ["sticky", "fixed"].some(
      (position) => getElementStyle(this.container, "position") === position
    ) ? this.container : getDocument(this.element).body, createTip(this), this._observer = new x(() => this.update()), this._toggleEventListeners(!0));
  }
  /**
   * Returns component name string.
   */
  get name() {
    return tooltipComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return tooltipDefaults;
  }
  // TOOLTIP PUBLIC METHODS
  // ======================
  /** Handles the focus event on iOS. */
  // istanbul ignore next @preserve - impossible to test without Apple device
  handleFocus = () => focus(this.element);
  /** Shows the tooltip. */
  handleShow = () => this.show();
  show() {
    const { options, tooltip, element, container, offsetParent, id } = this, { animation } = options, outTimer = Timer.get(element, "out"), tipContainer = container === offsetParent ? container : offsetParent;
    Timer.clear(element, "out"), tooltip && !outTimer && !hasTip(this) && Timer.set(
      element,
      () => {
        const showTooltipEvent = createCustomEvent(
          `show.bs.${toLowerCase(this.name)}`
        );
        dispatchEvent(element, showTooltipEvent), showTooltipEvent.defaultPrevented || (appendPopup(tooltip, tipContainer), setAttribute(element, ariaDescribedBy, `#${id}`), this.update(), toggleTooltipOpenHandlers(this, !0), hasClass(tooltip, showClass) || addClass(tooltip, showClass), animation ? emulateTransitionEnd(tooltip, () => tooltipShownAction(this)) : tooltipShownAction(this));
      },
      17,
      "in"
    );
  }
  /** Hides the tooltip. */
  handleHide = () => this.hide();
  hide() {
    const { options, tooltip, element } = this, { animation, delay } = options;
    Timer.clear(element, "in"), tooltip && hasTip(this) && Timer.set(
      element,
      () => {
        const hideTooltipEvent = createCustomEvent(
          `hide.bs.${toLowerCase(this.name)}`
        );
        dispatchEvent(element, hideTooltipEvent), hideTooltipEvent.defaultPrevented || (this.update(), removeClass(tooltip, showClass), toggleTooltipOpenHandlers(this), animation ? emulateTransitionEnd(tooltip, () => tooltipHiddenAction(this)) : tooltipHiddenAction(this));
      },
      delay + 17,
      "out"
    );
  }
  /** Updates the tooltip position. */
  update = () => {
    styleTip(this);
  };
  /** Toggles the tooltip visibility. */
  toggle = () => {
    const { tooltip } = this;
    tooltip && !hasTip(this) ? this.show() : this.hide();
  };
  /** Enables the tooltip. */
  enable() {
    const { enabled } = this;
    enabled || (this._toggleEventListeners(!0), this.enabled = !enabled);
  }
  /** Disables the tooltip. */
  disable() {
    const { tooltip, enabled } = this;
    enabled && (tooltip && hasTip(this) && this.hide(), this._toggleEventListeners(), this.enabled = !enabled);
  }
  /** Toggles the `disabled` property. */
  toggleEnabled() {
    this.enabled ? this.disable() : this.enable();
  }
  /**
   * Handles the `touchstart` event listener for `Tooltip`
   *
   * @this {Tooltip}
   * @param {TouchEvent} e the `Event` object
   */
  handleTouch = ({ target }) => {
    const { tooltip, element } = this;
    tooltip && tooltip.contains(target) || target === element || target && element.contains(target) || this.hide();
  };
  /**
   * Toggles on/off the `Tooltip` event listeners.
   *
   * @param add when `true`, event listeners are added
   */
  _toggleEventListeners = (add) => {
    const action = add ? E : r, { element, options, btn } = this, { trigger } = options, dismissible = !!(this.name !== tooltipComponent && options.dismissible);
    trigger.includes("manual") || (this.enabled = !!add, trigger.split(" ").forEach((tr) => {
      tr === mousehoverEvent ? (action(element, mousedownEvent, this.handleShow), action(element, mouseenterEvent, this.handleShow), dismissible || (action(element, mouseleaveEvent, this.handleHide), action(
        getDocument(element),
        touchstartEvent,
        this.handleTouch,
        passiveHandler
      ))) : tr === mouseclickEvent ? action(element, tr, dismissible ? this.handleShow : this.toggle) : tr === focusEvent && (action(element, focusinEvent, this.handleShow), dismissible || action(element, focusoutEvent, this.handleHide), isApple() && action(element, mouseclickEvent, this.handleFocus)), dismissible && btn && action(btn, mouseclickEvent, this.handleHide);
    }));
  };
  /** Removes the `Tooltip` from the target element. */
  dispose() {
    const { tooltip, options } = this, clone = { ...this, name: this.name }, callback = () => setTimeout(
      () => disposeTooltipComplete(clone, () => super.dispose()),
      17
    );
    options.animation && hasTip(clone) ? (this.options.delay = 0, this.hide(), emulateTransitionEnd(tooltip, callback)) : callback();
  }
}
const popoverSelector = `[${dataBsToggle}="${popoverString}"],[data-tip="${popoverString}"]`, popoverDefaults = ObjectAssign({}, tooltipDefaults, {
  template: getTipTemplate(popoverString),
  content: "",
  dismissible: !1,
  btnClose: '<button class="btn-close" aria-label="Close"></button>'
}), getPopoverInstance = (element) => getInstance(element, popoverComponent), popoverInitCallback = (element) => new Popover(element);
class Popover extends Tooltip {
  static selector = popoverSelector;
  static init = popoverInitCallback;
  static getInstance = getPopoverInstance;
  static styleTip = styleTip;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(target, config) {
    super(target, config);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return popoverComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return popoverDefaults;
  }
  /* extend original `show()` */
  show = () => {
    super.show();
    const { options, btn } = this;
    options.dismissible && btn && setTimeout(() => focus(btn), 17);
  };
}
const scrollspyString = "scrollspy", scrollspyComponent = "ScrollSpy", scrollspySelector = '[data-bs-spy="scroll"]', scrollspyDefaults = {
  offset: 10,
  target: null
}, getScrollSpyInstance = (element) => getInstance(element, scrollspyComponent), scrollspyInitCallback = (element) => new ScrollSpy(element), activateScrollSpy = createCustomEvent(`activate.bs.${scrollspyString}`), updateSpyTargets = (self) => {
  const { target, scrollTarget, options, itemsLength, scrollHeight, element } = self, { offset } = options, isRoot = scrollTarget !== element, links = target && getElementsByTagName("A", target), doc = getDocument(element), scrollHEIGHT = scrollTarget.scrollHeight;
  if (self.scrollTop = scrollTarget.scrollTop, links && (scrollHEIGHT !== scrollHeight || itemsLength !== links.length)) {
    let href, targetItem, rect;
    self.items = [], self.targets = [], self.offsets = [], self.scrollHeight = scrollHEIGHT, self.maxScroll = self.scrollHeight - getOffsetHeight(self), Array.from(links).forEach((link) => {
      href = getAttribute(link, "href"), targetItem = href && href.charAt(0) === "#" && href.slice(-1) !== "#" && querySelector(href, doc), targetItem && (self.items.push(link), self.targets.push(targetItem), rect = getBoundingClientRect(targetItem), self.offsets.push(
        (isRoot ? rect.top + self.scrollTop : targetItem.offsetTop) - offset
      ));
    }), self.itemsLength = self.items.length;
  }
}, toggleObservers = ({ targets, scrollTarget, element, _observer }, add) => {
  add ? scrollTarget === element ? targets.forEach((targetItem) => _observer.observe(targetItem)) : _observer.observe(element) : _observer.disconnect();
}, getScrollHeight = (scrollTarget) => scrollTarget.scrollHeight, getOffsetHeight = ({ element, scrollTarget }) => scrollTarget !== element ? scrollTarget.clientHeight : getBoundingClientRect(element).height, clear = (target) => {
  [...getElementsByTagName("A", target)].forEach((item) => {
    hasClass(item, activeClass) && removeClass(item, activeClass);
  });
}, activate = (self, item) => {
  const { target, element } = self;
  isHTMLElement(target) && clear(target), self.activeItem = item, addClass(item, activeClass);
  const parents = [];
  let parentItem = item;
  for (; parentItem !== getDocumentBody(element); )
    parentItem = parentItem.parentElement, (hasClass(parentItem, "nav") || hasClass(parentItem, "dropdown-menu")) && parents.push(parentItem);
  parents.forEach((menuItem) => {
    const parentLink = menuItem.previousElementSibling;
    parentLink && !hasClass(parentLink, activeClass) && addClass(parentLink, activeClass);
  }), activateScrollSpy.relatedTarget = item, dispatchEvent(element, activateScrollSpy);
};
class ScrollSpy extends BaseComponent {
  static selector = scrollspySelector;
  static init = scrollspyInitCallback;
  static getInstance = getScrollSpyInstance;
  /**
   * @param target the target element
   * @param config the instance options
   */
  constructor(target, config) {
    super(target, config);
    const { element, options } = this;
    this.target = querySelector(
      options.target,
      getDocument(element)
    ), this.target && (this.scrollTarget = element.clientHeight < element.scrollHeight ? element : getDocumentElement(element), this.scrollHeight = getScrollHeight(this.scrollTarget), this.refresh(), this._observer = new x(() => this.refresh(), {
      root: this.scrollTarget
    }), toggleObservers(this, !0));
  }
  /* eslint-disable */
  /**
   * Returns component name string.
   */
  get name() {
    return scrollspyComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return scrollspyDefaults;
  }
  /* eslint-enable */
  // SCROLLSPY PUBLIC METHODS
  // ========================
  /** Updates all items. */
  refresh = () => {
    const { target } = this;
    if (isHTMLElement(target) && target.offsetHeight > 0) {
      updateSpyTargets(this);
      const { scrollTop, maxScroll, itemsLength, items, activeItem } = this;
      if (scrollTop >= maxScroll) {
        const newActiveItem = items[itemsLength - 1];
        activeItem !== newActiveItem && activate(this, newActiveItem);
        return;
      }
      const { offsets } = this;
      if (activeItem && scrollTop < offsets[0] && offsets[0] > 0) {
        this.activeItem = null, target && clear(target);
        return;
      }
      items.forEach((item, i) => {
        activeItem !== item && scrollTop >= offsets[i] && (typeof offsets[i + 1] > "u" || scrollTop < offsets[i + 1]) && activate(this, item);
      });
    }
  };
  /** Removes `ScrollSpy` from the target element. */
  dispose() {
    const clone = { ...this };
    toggleObservers(clone), super.dispose();
  }
}
const tabString = "tab", tabComponent = "Tab", tabSelector = `[${dataBsToggle}="${tabString}"]`, getTabInstance = (element) => getInstance(element, tabComponent), tabInitCallback = (element) => new Tab(element), showTabEvent = createCustomEvent(
  `show.bs.${tabString}`
), shownTabEvent = createCustomEvent(
  `shown.bs.${tabString}`
), hideTabEvent = createCustomEvent(
  `hide.bs.${tabString}`
), hiddenTabEvent = createCustomEvent(
  `hidden.bs.${tabString}`
), tabPrivate = /* @__PURE__ */ new Map(), triggerTabEnd = (self) => {
  const { tabContent, nav } = self;
  tabContent && hasClass(tabContent, collapsingClass) && (tabContent.style.height = "", removeClass(tabContent, collapsingClass)), nav && Timer.clear(nav);
}, triggerTabShow = (self) => {
  const { element, tabContent, content: nextContent, nav } = self, { tab } = isHTMLElement(nav) && tabPrivate.get(nav) || // istanbul ignore next @preserve
  { tab: null };
  if (tabContent && nextContent && hasClass(nextContent, fadeClass)) {
    const { currentHeight, nextHeight } = tabPrivate.get(element) || // istanbul ignore next @preserve
    { currentHeight: 0, nextHeight: 0 };
    currentHeight !== nextHeight ? setTimeout(() => {
      tabContent.style.height = `${nextHeight}px`, reflow(tabContent), emulateTransitionEnd(tabContent, () => triggerTabEnd(self));
    }, 50) : triggerTabEnd(self);
  } else nav && Timer.clear(nav);
  shownTabEvent.relatedTarget = tab, dispatchEvent(element, shownTabEvent);
}, triggerTabHide = (self) => {
  const { element, content: nextContent, tabContent, nav } = self, { tab, content } = nav && tabPrivate.get(nav) || // istanbul ignore next @preserve
  { tab: null, content: null };
  let currentHeight = 0;
  if (tabContent && nextContent && hasClass(nextContent, fadeClass) && ([content, nextContent].forEach((c) => {
    isHTMLElement(c) && addClass(c, "overflow-hidden");
  }), currentHeight = isHTMLElement(content) ? content.scrollHeight : 0), showTabEvent.relatedTarget = tab, hiddenTabEvent.relatedTarget = element, dispatchEvent(element, showTabEvent), !showTabEvent.defaultPrevented) {
    if (nextContent && addClass(nextContent, activeClass), content && removeClass(content, activeClass), tabContent && nextContent && hasClass(nextContent, fadeClass)) {
      const nextHeight = nextContent.scrollHeight;
      tabPrivate.set(element, {
        currentHeight,
        nextHeight,
        tab: null,
        content: null
      }), addClass(tabContent, collapsingClass), tabContent.style.height = `${currentHeight}px`, reflow(tabContent), [content, nextContent].forEach((c) => {
        c && removeClass(c, "overflow-hidden");
      });
    }
    nextContent && nextContent && hasClass(nextContent, fadeClass) ? setTimeout(() => {
      addClass(nextContent, showClass), emulateTransitionEnd(nextContent, () => {
        triggerTabShow(self);
      });
    }, 1) : (nextContent && addClass(nextContent, showClass), triggerTabShow(self)), tab && dispatchEvent(tab, hiddenTabEvent);
  }
}, getActiveTab = (self) => {
  const { nav } = self;
  if (!isHTMLElement(nav))
    return { tab: null, content: null };
  const activeTabs = getElementsByClassName(activeClass, nav);
  let tab = null;
  activeTabs.length === 1 && !dropdownMenuClasses.some(
    (c) => hasClass(activeTabs[0].parentElement, c)
  ) ? [tab] = activeTabs : activeTabs.length > 1 && (tab = activeTabs[activeTabs.length - 1]);
  const content = isHTMLElement(tab) ? getTargetElement(tab) : null;
  return { tab, content };
}, getParentDropdown = (element) => {
  if (!isHTMLElement(element)) return null;
  const dropdown = closest(element, `.${dropdownMenuClasses.join(",.")}`);
  return dropdown ? querySelector(`.${dropdownMenuClasses[0]}-toggle`, dropdown) : null;
}, tabClickHandler = (e2) => {
  const self = getTabInstance(e2.target);
  self && (e2.preventDefault(), self.show());
};
class Tab extends BaseComponent {
  static selector = tabSelector;
  static init = tabInitCallback;
  static getInstance = getTabInstance;
  /** @param target the target element */
  constructor(target) {
    super(target);
    const { element } = this, content = getTargetElement(element);
    if (content) {
      const nav = closest(element, ".nav"), container = closest(content, ".tab-content");
      this.nav = nav, this.content = content, this.tabContent = container, this.dropdown = getParentDropdown(element);
      const { tab } = getActiveTab(this);
      if (nav && !tab) {
        const firstTab = querySelector(tabSelector, nav), firstTabContent = firstTab && getTargetElement(firstTab);
        firstTabContent && (addClass(firstTab, activeClass), addClass(firstTabContent, showClass), addClass(firstTabContent, activeClass), setAttribute(element, ariaSelected, "true"));
      }
      this._toggleEventListeners(!0);
    }
  }
  /**
   * Returns component name string.
   */
  get name() {
    return tabComponent;
  }
  // TAB PUBLIC METHODS
  // ==================
  /** Shows the tab to the user. */
  show() {
    const { element, content: nextContent, nav, dropdown } = this;
    if (!(nav && Timer.get(nav)) && !hasClass(element, activeClass)) {
      const { tab, content } = getActiveTab(this);
      if (nav && tabPrivate.set(nav, { tab, content, currentHeight: 0, nextHeight: 0 }), hideTabEvent.relatedTarget = element, isHTMLElement(tab) && (dispatchEvent(tab, hideTabEvent), !hideTabEvent.defaultPrevented)) {
        addClass(element, activeClass), setAttribute(element, ariaSelected, "true");
        const activeDropdown = isHTMLElement(tab) && getParentDropdown(tab);
        if (activeDropdown && hasClass(activeDropdown, activeClass) && removeClass(activeDropdown, activeClass), nav) {
          const toggleTab = () => {
            tab && (removeClass(tab, activeClass), setAttribute(tab, ariaSelected, "false")), dropdown && !hasClass(dropdown, activeClass) && addClass(dropdown, activeClass);
          };
          content && (hasClass(content, fadeClass) || nextContent && hasClass(nextContent, fadeClass)) ? Timer.set(nav, toggleTab, 1) : toggleTab();
        }
        content && (removeClass(content, showClass), hasClass(content, fadeClass) ? emulateTransitionEnd(content, () => triggerTabHide(this)) : triggerTabHide(this));
      }
    }
  }
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, event listener is added
   */
  _toggleEventListeners = (add) => {
    (add ? E : r)(this.element, mouseclickEvent, tabClickHandler);
  };
  /** Removes the `Tab` component from the target element. */
  dispose() {
    this._toggleEventListeners(), super.dispose();
  }
}
const toastString = "toast", toastComponent = "Toast", toastSelector = `.${toastString}`, toastDismissSelector = `[${dataBsDismiss}="${toastString}"]`, toastToggleSelector = `[${dataBsToggle}="${toastString}"]`, showingClass = "showing", hideClass = "hide", toastDefaults = {
  animation: !0,
  autohide: !0,
  delay: 5e3
}, getToastInstance = (element) => getInstance(element, toastComponent), toastInitCallback = (element) => new Toast(element), showToastEvent = createCustomEvent(
  `show.bs.${toastString}`
), shownToastEvent = createCustomEvent(
  `shown.bs.${toastString}`
), hideToastEvent = createCustomEvent(
  `hide.bs.${toastString}`
), hiddenToastEvent = createCustomEvent(
  `hidden.bs.${toastString}`
), showToastComplete = (self) => {
  const { element, options } = self;
  removeClass(element, showingClass), Timer.clear(element, showingClass), dispatchEvent(element, shownToastEvent), options.autohide && Timer.set(element, () => self.hide(), options.delay, toastString);
}, hideToastComplete = (self) => {
  const { element } = self;
  removeClass(element, showingClass), removeClass(element, showClass), addClass(element, hideClass), Timer.clear(element, toastString), dispatchEvent(element, hiddenToastEvent);
}, hideToast = (self) => {
  const { element, options } = self;
  addClass(element, showingClass), options.animation ? (reflow(element), emulateTransitionEnd(element, () => hideToastComplete(self))) : hideToastComplete(self);
}, showToast = (self) => {
  const { element, options } = self;
  Timer.set(
    element,
    () => {
      removeClass(element, hideClass), reflow(element), addClass(element, showClass), addClass(element, showingClass), options.animation ? emulateTransitionEnd(element, () => showToastComplete(self)) : showToastComplete(self);
    },
    17,
    showingClass
  );
}, toastClickHandler = (e2) => {
  const { target } = e2, trigger = target && closest(target, toastToggleSelector), element = trigger && getTargetElement(trigger), self = element && getToastInstance(element);
  self && (trigger && trigger.tagName === "A" && e2.preventDefault(), self.relatedTarget = trigger, self.show());
}, interactiveToastHandler = (e2) => {
  const element = e2.target, self = getToastInstance(element), { type, relatedTarget } = e2;
  self && element !== relatedTarget && !element.contains(relatedTarget) && ([mouseenterEvent, focusinEvent].includes(type) ? Timer.clear(element, toastString) : Timer.set(element, () => self.hide(), self.options.delay, toastString));
};
class Toast extends BaseComponent {
  static selector = toastSelector;
  static init = toastInitCallback;
  static getInstance = getToastInstance;
  /**
   * @param target the target `.toast` element
   * @param config the instance options
   */
  constructor(target, config) {
    super(target, config);
    const { element, options } = this;
    options.animation && !hasClass(element, fadeClass) ? addClass(element, fadeClass) : !options.animation && hasClass(element, fadeClass) && removeClass(element, fadeClass), this.dismiss = querySelector(toastDismissSelector, element), this.triggers = [
      ...querySelectorAll(toastToggleSelector, getDocument(element))
    ].filter(
      (btn) => getTargetElement(btn) === element
    ), this._toggleEventListeners(!0);
  }
  /**
   * Returns component name string.
   */
  get name() {
    return toastComponent;
  }
  /**
   * Returns component default options.
   */
  get defaults() {
    return toastDefaults;
  }
  /**
   * Returns *true* when toast is visible.
   */
  get isShown() {
    return hasClass(this.element, showClass);
  }
  // TOAST PUBLIC METHODS
  // ====================
  /** Shows the toast. */
  show = () => {
    const { element, isShown } = this;
    element && !isShown && (dispatchEvent(element, showToastEvent), showToastEvent.defaultPrevented || showToast(this));
  };
  /** Hides the toast. */
  hide = () => {
    const { element, isShown } = this;
    element && isShown && (dispatchEvent(element, hideToastEvent), hideToastEvent.defaultPrevented || hideToast(this));
  };
  /**
   * Toggles on/off the `click` event listener.
   *
   * @param add when `true`, it will add the listener
   */
  _toggleEventListeners = (add) => {
    const action = add ? E : r, { element, triggers, dismiss, options, hide } = this;
    dismiss && action(dismiss, mouseclickEvent, hide), options.autohide && [focusinEvent, focusoutEvent, mouseenterEvent, mouseleaveEvent].forEach(
      (e2) => action(element, e2, interactiveToastHandler)
    ), triggers.length && triggers.forEach(
      (btn) => action(btn, mouseclickEvent, toastClickHandler)
    );
  };
  /** Removes the `Toast` component from the target element. */
  dispose() {
    const { element, isShown } = this;
    this._toggleEventListeners(), Timer.clear(element, toastString), isShown && removeClass(element, showClass), super.dispose();
  }
}
const componentsList = /* @__PURE__ */ new Map();
[
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip
].forEach((c) => componentsList.set(c.prototype.name, c));
const initComponentDataAPI = (callback, collection) => {
  [...collection].forEach((x2) => callback(x2));
}, removeComponentDataAPI = (component, context) => {
  const compData = Data.getAllFor(component);
  compData && [...compData].forEach(([element, instance]) => {
    context.contains(element) && instance.dispose();
  });
}, initCallback = (context) => {
  const lookUp = context && context.nodeName ? context : document, elemCollection = [...getElementsByTagName("*", lookUp)];
  componentsList.forEach((cs) => {
    const { init, selector } = cs;
    initComponentDataAPI(
      init,
      elemCollection.filter((item) => matches(item, selector))
    );
  });
}, removeDataAPI = (context) => {
  const lookUp = context && context.nodeName ? context : document;
  componentsList.forEach((comp) => {
    removeComponentDataAPI(comp.prototype.name, lookUp);
  });
};
document.body ? initCallback() : E(document, "DOMContentLoaded", () => initCallback(), {
  once: !0
});
export {
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Offcanvas,
  Popover,
  ScrollSpy,
  Tab,
  Toast,
  Tooltip,
  initCallback,
  removeDataAPI
};
//# sourceMappingURL=bootstrap-native.mjs.map
