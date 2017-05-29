(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();
require.hmr({"___globals___":[],"auto-reload-brunch/vendor/auto-reload.js":[],"hmr-brunch/runtime.js":[],"config.ts":[],"initialize.tsx":["react-dom/index.js","react/react.js","components/app.tsx"],"components/app.tsx":["react/react.js","components/board.tsx","models/cell.ts","config.ts"],"components/cell.tsx":["react/react.js"],"components/board.tsx":["react/react.js","components/cell.tsx","config.ts"],"react-dom/index.js":["react-dom/lib/ReactDOM.js"],"react/react.js":["react/lib/React.js"],"react-dom/lib/ReactDOM.js":["react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactDefaultInjection.js","react-dom/lib/ReactMount.js","react-dom/lib/ReactReconciler.js","react-dom/lib/ReactUpdates.js","react-dom/lib/ReactVersion.js","react-dom/lib/findDOMNode.js","react-dom/lib/getHostComponentFromComposite.js","react-dom/lib/renderSubtreeIntoContainer.js","fbjs/lib/warning.js","fbjs/lib/ExecutionEnvironment.js","react-dom/lib/ReactInstrumentation.js","react-dom/lib/ReactDOMUnknownPropertyHook.js","react-dom/lib/ReactDOMNullInputValuePropHook.js","react-dom/lib/ReactDOMInvalidARIAHook.js"],"react/lib/React.js":["object-assign/index.js","react/lib/ReactChildren.js","react/lib/ReactComponent.js","react/lib/ReactPureComponent.js","react/lib/ReactClass.js","react/lib/ReactDOMFactories.js","react/lib/ReactElement.js","react/lib/ReactPropTypes.js","react/lib/ReactVersion.js","react/lib/onlyChild.js","fbjs/lib/warning.js","react/lib/canDefineProperty.js","react/lib/ReactElementValidator.js"],"react-dom/lib/ReactDOMComponentTree.js":["react-dom/lib/reactProdInvariant.js","react-dom/lib/DOMProperty.js","react-dom/lib/ReactDOMComponentFlags.js","fbjs/lib/invariant.js"],"react-dom/lib/ReactDefaultInjection.js":["react-dom/lib/ARIADOMPropertyConfig.js","react-dom/lib/BeforeInputEventPlugin.js","react-dom/lib/ChangeEventPlugin.js","react-dom/lib/DefaultEventPluginOrder.js","react-dom/lib/EnterLeaveEventPlugin.js","react-dom/lib/HTMLDOMPropertyConfig.js","react-dom/lib/ReactComponentBrowserEnvironment.js","react-dom/lib/ReactDOMComponent.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactDOMEmptyComponent.js","react-dom/lib/ReactDOMTreeTraversal.js","react-dom/lib/ReactDOMTextComponent.js","react-dom/lib/ReactDefaultBatchingStrategy.js","react-dom/lib/ReactEventListener.js","react-dom/lib/ReactInjection.js","react-dom/lib/ReactReconcileTransaction.js","react-dom/lib/SVGDOMPropertyConfig.js","react-dom/lib/SelectEventPlugin.js","react-dom/lib/SimpleEventPlugin.js"],"react-dom/lib/ReactReconciler.js":["react-dom/lib/ReactRef.js","react-dom/lib/ReactInstrumentation.js","fbjs/lib/warning.js"],"react-dom/lib/ReactMount.js":["react-dom/lib/reactProdInvariant.js","react-dom/lib/DOMLazyTree.js","react-dom/lib/DOMProperty.js","react/lib/React.js","react-dom/lib/ReactBrowserEventEmitter.js","react/lib/ReactCurrentOwner.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactDOMContainerInfo.js","react-dom/lib/ReactDOMFeatureFlags.js","react-dom/lib/ReactFeatureFlags.js","react-dom/lib/ReactInstanceMap.js","react-dom/lib/ReactInstrumentation.js","react-dom/lib/ReactMarkupChecksum.js","react-dom/lib/ReactReconciler.js","react-dom/lib/ReactUpdateQueue.js","react-dom/lib/ReactUpdates.js","fbjs/lib/emptyObject.js","react-dom/lib/instantiateReactComponent.js","fbjs/lib/invariant.js","react-dom/lib/setInnerHTML.js","react-dom/lib/shouldUpdateReactComponent.js","fbjs/lib/warning.js","process/browser.js"],"react-dom/lib/ReactUpdates.js":["react-dom/lib/reactProdInvariant.js","object-assign/index.js","react-dom/lib/CallbackQueue.js","react-dom/lib/PooledClass.js","react-dom/lib/ReactFeatureFlags.js","react-dom/lib/ReactReconciler.js","react-dom/lib/Transaction.js","fbjs/lib/invariant.js"],"react-dom/lib/ReactVersion.js":[],"react-dom/lib/findDOMNode.js":["react-dom/lib/reactProdInvariant.js","react/lib/ReactCurrentOwner.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactInstanceMap.js","react-dom/lib/getHostComponentFromComposite.js","fbjs/lib/invariant.js","fbjs/lib/warning.js"],"react-dom/lib/getHostComponentFromComposite.js":["react-dom/lib/ReactNodeTypes.js"],"react-dom/lib/renderSubtreeIntoContainer.js":["react-dom/lib/ReactMount.js"],"react-dom/lib/ReactInstrumentation.js":["react-dom/lib/ReactDebugTool.js"],"react-dom/lib/ReactDOMUnknownPropertyHook.js":["react-dom/lib/DOMProperty.js","react-dom/lib/EventPluginRegistry.js","react/lib/ReactComponentTreeHook.js","fbjs/lib/warning.js"],"react-dom/lib/ReactDOMNullInputValuePropHook.js":["react/lib/ReactComponentTreeHook.js","fbjs/lib/warning.js"],"react-dom/lib/ReactDOMInvalidARIAHook.js":["react-dom/lib/DOMProperty.js","react/lib/ReactComponentTreeHook.js","fbjs/lib/warning.js"],"react/lib/ReactChildren.js":["react/lib/PooledClass.js","react/lib/ReactElement.js","fbjs/lib/emptyFunction.js","react/lib/traverseAllChildren.js"],"react/lib/ReactComponent.js":["react/lib/reactProdInvariant.js","react/lib/ReactNoopUpdateQueue.js","react/lib/canDefineProperty.js","fbjs/lib/emptyObject.js","fbjs/lib/invariant.js","fbjs/lib/warning.js"],"react/lib/ReactPureComponent.js":["object-assign/index.js","react/lib/ReactComponent.js","react/lib/ReactNoopUpdateQueue.js","fbjs/lib/emptyObject.js"],"react/lib/ReactClass.js":["react/lib/reactProdInvariant.js","object-assign/index.js","react/lib/ReactComponent.js","react/lib/ReactElement.js","react/lib/ReactPropTypeLocationNames.js","react/lib/ReactNoopUpdateQueue.js","fbjs/lib/emptyObject.js","fbjs/lib/invariant.js","fbjs/lib/warning.js"],"react/lib/ReactDOMFactories.js":["react/lib/ReactElement.js","react/lib/ReactElementValidator.js"],"react/lib/ReactElement.js":["object-assign/index.js","react/lib/ReactCurrentOwner.js","fbjs/lib/warning.js","react/lib/canDefineProperty.js","react/lib/ReactElementSymbol.js"],"react/lib/ReactPropTypes.js":["react/lib/ReactElement.js","prop-types/factory.js"],"react/lib/onlyChild.js":["react/lib/reactProdInvariant.js","react/lib/ReactElement.js","fbjs/lib/invariant.js"],"react/lib/ReactVersion.js":[],"react/lib/canDefineProperty.js":[],"react/lib/ReactElementValidator.js":["react/lib/ReactCurrentOwner.js","react/lib/ReactComponentTreeHook.js","react/lib/ReactElement.js","react/lib/checkReactTypeSpec.js","react/lib/canDefineProperty.js","react/lib/getIteratorFn.js","fbjs/lib/warning.js"],"fbjs/lib/ExecutionEnvironment.js":[],"fbjs/lib/warning.js":["fbjs/lib/emptyFunction.js"],"object-assign/index.js":[],"react-dom/lib/ReactNodeTypes.js":["react-dom/lib/reactProdInvariant.js","react/lib/React.js","fbjs/lib/invariant.js"],"react-dom/lib/ReactDebugTool.js":["react-dom/lib/ReactInvalidSetStateWarningHook.js","react-dom/lib/ReactHostOperationHistoryHook.js","react/lib/ReactComponentTreeHook.js","fbjs/lib/ExecutionEnvironment.js","fbjs/lib/performanceNow.js","fbjs/lib/warning.js"],"react-dom/lib/ARIADOMPropertyConfig.js":[],"react-dom/lib/BeforeInputEventPlugin.js":["react-dom/lib/EventPropagators.js","fbjs/lib/ExecutionEnvironment.js","react-dom/lib/FallbackCompositionState.js","react-dom/lib/SyntheticCompositionEvent.js","react-dom/lib/SyntheticInputEvent.js"],"react-dom/lib/ChangeEventPlugin.js":["react-dom/lib/EventPluginHub.js","react-dom/lib/EventPropagators.js","fbjs/lib/ExecutionEnvironment.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactUpdates.js","react-dom/lib/SyntheticEvent.js","react-dom/lib/getEventTarget.js","react-dom/lib/isEventSupported.js","react-dom/lib/isTextInputElement.js"],"react-dom/lib/DefaultEventPluginOrder.js":[],"react-dom/lib/EnterLeaveEventPlugin.js":["react-dom/lib/EventPropagators.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/SyntheticMouseEvent.js"],"react-dom/lib/HTMLDOMPropertyConfig.js":["react-dom/lib/DOMProperty.js"],"react-dom/lib/ReactComponentBrowserEnvironment.js":["react-dom/lib/DOMChildrenOperations.js","react-dom/lib/ReactDOMIDOperations.js"],"react-dom/lib/ReactDOMTreeTraversal.js":["react-dom/lib/reactProdInvariant.js","fbjs/lib/invariant.js"],"react-dom/lib/ReactDOMComponent.js":["react-dom/lib/reactProdInvariant.js","object-assign/index.js","react-dom/lib/AutoFocusUtils.js","react-dom/lib/CSSPropertyOperations.js","react-dom/lib/DOMLazyTree.js","react-dom/lib/DOMNamespaces.js","react-dom/lib/DOMProperty.js","react-dom/lib/DOMPropertyOperations.js","react-dom/lib/EventPluginHub.js","react-dom/lib/EventPluginRegistry.js","react-dom/lib/ReactBrowserEventEmitter.js","react-dom/lib/ReactDOMComponentFlags.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactDOMInput.js","react-dom/lib/ReactDOMOption.js","react-dom/lib/ReactDOMSelect.js","react-dom/lib/ReactDOMTextarea.js","react-dom/lib/ReactInstrumentation.js","react-dom/lib/ReactMultiChild.js","react-dom/lib/ReactServerRenderingTransaction.js","fbjs/lib/emptyFunction.js","react-dom/lib/escapeTextContentForBrowser.js","fbjs/lib/invariant.js","react-dom/lib/isEventSupported.js","fbjs/lib/shallowEqual.js","react-dom/lib/validateDOMNesting.js","fbjs/lib/warning.js"],"react-dom/lib/ReactDOMEmptyComponent.js":["object-assign/index.js","react-dom/lib/DOMLazyTree.js","react-dom/lib/ReactDOMComponentTree.js"],"react-dom/lib/ReactDOMTextComponent.js":["react-dom/lib/reactProdInvariant.js","object-assign/index.js","react-dom/lib/DOMChildrenOperations.js","react-dom/lib/DOMLazyTree.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/escapeTextContentForBrowser.js","fbjs/lib/invariant.js","react-dom/lib/validateDOMNesting.js"],"react-dom/lib/ReactDefaultBatchingStrategy.js":["object-assign/index.js","react-dom/lib/ReactUpdates.js","react-dom/lib/Transaction.js","fbjs/lib/emptyFunction.js"],"react-dom/lib/ReactInjection.js":["react-dom/lib/DOMProperty.js","react-dom/lib/EventPluginHub.js","react-dom/lib/EventPluginUtils.js","react-dom/lib/ReactComponentEnvironment.js","react-dom/lib/ReactEmptyComponent.js","react-dom/lib/ReactBrowserEventEmitter.js","react-dom/lib/ReactHostComponent.js","react-dom/lib/ReactUpdates.js"],"react-dom/lib/ReactEventListener.js":["object-assign/index.js","fbjs/lib/EventListener.js","fbjs/lib/ExecutionEnvironment.js","react-dom/lib/PooledClass.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactUpdates.js","react-dom/lib/getEventTarget.js","fbjs/lib/getUnboundedScrollPosition.js"],"react-dom/lib/ReactReconcileTransaction.js":["object-assign/index.js","react-dom/lib/CallbackQueue.js","react-dom/lib/PooledClass.js","react-dom/lib/ReactBrowserEventEmitter.js","react-dom/lib/ReactInputSelection.js","react-dom/lib/ReactInstrumentation.js","react-dom/lib/Transaction.js","react-dom/lib/ReactUpdateQueue.js"],"react-dom/lib/SVGDOMPropertyConfig.js":[],"react-dom/lib/SelectEventPlugin.js":["react-dom/lib/EventPropagators.js","fbjs/lib/ExecutionEnvironment.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactInputSelection.js","react-dom/lib/SyntheticEvent.js","fbjs/lib/getActiveElement.js","react-dom/lib/isTextInputElement.js","fbjs/lib/shallowEqual.js"],"react-dom/lib/SimpleEventPlugin.js":["react-dom/lib/reactProdInvariant.js","fbjs/lib/EventListener.js","react-dom/lib/EventPropagators.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/SyntheticAnimationEvent.js","react-dom/lib/SyntheticClipboardEvent.js","react-dom/lib/SyntheticEvent.js","react-dom/lib/SyntheticFocusEvent.js","react-dom/lib/SyntheticKeyboardEvent.js","react-dom/lib/SyntheticMouseEvent.js","react-dom/lib/SyntheticDragEvent.js","react-dom/lib/SyntheticTouchEvent.js","react-dom/lib/SyntheticTransitionEvent.js","react-dom/lib/SyntheticUIEvent.js","react-dom/lib/SyntheticWheelEvent.js","fbjs/lib/emptyFunction.js","react-dom/lib/getEventCharCode.js","fbjs/lib/invariant.js"],"fbjs/lib/emptyFunction.js":[],"react-dom/lib/EventPropagators.js":["react-dom/lib/EventPluginHub.js","react-dom/lib/EventPluginUtils.js","react-dom/lib/accumulateInto.js","react-dom/lib/forEachAccumulated.js","fbjs/lib/warning.js"],"react-dom/lib/SyntheticMouseEvent.js":["react-dom/lib/SyntheticUIEvent.js","react-dom/lib/ViewportMetrics.js","react-dom/lib/getEventModifierState.js"],"react-dom/lib/DOMProperty.js":["react-dom/lib/reactProdInvariant.js","fbjs/lib/invariant.js"],"react-dom/lib/DOMChildrenOperations.js":["react-dom/lib/DOMLazyTree.js","react-dom/lib/Danger.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactInstrumentation.js","react-dom/lib/createMicrosoftUnsafeLocalFunction.js","react-dom/lib/setInnerHTML.js","react-dom/lib/setTextContent.js"],"react-dom/lib/ReactDOMIDOperations.js":["react-dom/lib/DOMChildrenOperations.js","react-dom/lib/ReactDOMComponentTree.js"],"react-dom/lib/EventPluginHub.js":["react-dom/lib/reactProdInvariant.js","react-dom/lib/EventPluginRegistry.js","react-dom/lib/EventPluginUtils.js","react-dom/lib/ReactErrorUtils.js","react-dom/lib/accumulateInto.js","react-dom/lib/forEachAccumulated.js","fbjs/lib/invariant.js"],"react-dom/lib/EventPluginUtils.js":["react-dom/lib/reactProdInvariant.js","react-dom/lib/ReactErrorUtils.js","fbjs/lib/invariant.js","fbjs/lib/warning.js"],"react-dom/lib/ReactComponentEnvironment.js":["react-dom/lib/reactProdInvariant.js","fbjs/lib/invariant.js"],"react-dom/lib/ReactEmptyComponent.js":[],"react-dom/lib/ReactBrowserEventEmitter.js":["object-assign/index.js","react-dom/lib/EventPluginRegistry.js","react-dom/lib/ReactEventEmitterMixin.js","react-dom/lib/ViewportMetrics.js","react-dom/lib/getVendorPrefixedEventName.js","react-dom/lib/isEventSupported.js"],"react-dom/lib/ReactHostComponent.js":["react-dom/lib/reactProdInvariant.js","fbjs/lib/invariant.js"],"react-dom/lib/SyntheticUIEvent.js":["react-dom/lib/SyntheticEvent.js","react-dom/lib/getEventTarget.js"],"react-dom/lib/ViewportMetrics.js":[],"react-dom/lib/getEventModifierState.js":[],"react-dom/lib/DOMLazyTree.js":["react-dom/lib/DOMNamespaces.js","react-dom/lib/setInnerHTML.js","react-dom/lib/createMicrosoftUnsafeLocalFunction.js","react-dom/lib/setTextContent.js"],"react-dom/lib/Danger.js":["react-dom/lib/reactProdInvariant.js","react-dom/lib/DOMLazyTree.js","fbjs/lib/ExecutionEnvironment.js","fbjs/lib/createNodesFromMarkup.js","fbjs/lib/emptyFunction.js","fbjs/lib/invariant.js"],"react-dom/lib/createMicrosoftUnsafeLocalFunction.js":[],"react-dom/lib/setInnerHTML.js":["fbjs/lib/ExecutionEnvironment.js","react-dom/lib/DOMNamespaces.js","react-dom/lib/createMicrosoftUnsafeLocalFunction.js"],"react-dom/lib/setTextContent.js":["fbjs/lib/ExecutionEnvironment.js","react-dom/lib/escapeTextContentForBrowser.js","react-dom/lib/setInnerHTML.js"],"react-dom/lib/getEventTarget.js":[],"react-dom/lib/SyntheticEvent.js":["object-assign/index.js","react-dom/lib/PooledClass.js","fbjs/lib/emptyFunction.js","fbjs/lib/warning.js"],"react-dom/lib/DOMNamespaces.js":[],"react-dom/lib/CallbackQueue.js":["react-dom/lib/reactProdInvariant.js","react-dom/lib/PooledClass.js","fbjs/lib/invariant.js"],"react-dom/lib/PooledClass.js":["react-dom/lib/reactProdInvariant.js","fbjs/lib/invariant.js"],"react-dom/lib/ReactInputSelection.js":["react-dom/lib/ReactDOMSelection.js","fbjs/lib/containsNode.js","fbjs/lib/focusNode.js","fbjs/lib/getActiveElement.js"],"react-dom/lib/Transaction.js":["react-dom/lib/reactProdInvariant.js","fbjs/lib/invariant.js"],"react-dom/lib/ReactUpdateQueue.js":["react-dom/lib/reactProdInvariant.js","react/lib/ReactCurrentOwner.js","react-dom/lib/ReactInstanceMap.js","react-dom/lib/ReactInstrumentation.js","react-dom/lib/ReactUpdates.js","fbjs/lib/invariant.js","fbjs/lib/warning.js"],"prop-types/factory.js":["prop-types/factoryWithTypeCheckers.js"],"react-dom/lib/ReactEventEmitterMixin.js":["react-dom/lib/EventPluginHub.js"],"react-dom/lib/EventPluginRegistry.js":["react-dom/lib/reactProdInvariant.js","fbjs/lib/invariant.js"],"react-dom/lib/getVendorPrefixedEventName.js":["fbjs/lib/ExecutionEnvironment.js"],"react-dom/lib/isEventSupported.js":["fbjs/lib/ExecutionEnvironment.js"],"prop-types/factoryWithTypeCheckers.js":["fbjs/lib/emptyFunction.js","fbjs/lib/invariant.js","fbjs/lib/warning.js","prop-types/lib/ReactPropTypesSecret.js","prop-types/checkPropTypes.js"],"react-dom/lib/reactProdInvariant.js":[],"react-dom/lib/ReactRef.js":["react-dom/lib/ReactOwner.js"],"react-dom/lib/ReactDOMComponentFlags.js":[],"react-dom/lib/ReactDOMContainerInfo.js":["react-dom/lib/validateDOMNesting.js"],"react-dom/lib/ReactFeatureFlags.js":[],"fbjs/lib/invariant.js":[],"react/lib/ReactCurrentOwner.js":[],"react-dom/lib/ReactDOMFeatureFlags.js":[],"react-dom/lib/ReactInstanceMap.js":[],"react-dom/lib/ReactMarkupChecksum.js":["react-dom/lib/adler32.js"],"fbjs/lib/emptyObject.js":[],"react-dom/lib/instantiateReactComponent.js":["react-dom/lib/reactProdInvariant.js","object-assign/index.js","react-dom/lib/ReactCompositeComponent.js","react-dom/lib/ReactEmptyComponent.js","react-dom/lib/ReactHostComponent.js","react/lib/getNextDebugID.js","fbjs/lib/invariant.js","fbjs/lib/warning.js"],"react-dom/lib/shouldUpdateReactComponent.js":[],"react/lib/ReactComponentTreeHook.js":["react/lib/reactProdInvariant.js","react/lib/ReactCurrentOwner.js","fbjs/lib/invariant.js","fbjs/lib/warning.js"],"react/lib/PooledClass.js":["react/lib/reactProdInvariant.js","fbjs/lib/invariant.js"],"react/lib/traverseAllChildren.js":["react/lib/reactProdInvariant.js","react/lib/ReactCurrentOwner.js","react/lib/ReactElementSymbol.js","react/lib/getIteratorFn.js","fbjs/lib/invariant.js","react/lib/KeyEscapeUtils.js","fbjs/lib/warning.js","process/browser.js"],"react/lib/reactProdInvariant.js":[],"react/lib/ReactNoopUpdateQueue.js":["fbjs/lib/warning.js"],"react/lib/ReactPropTypeLocationNames.js":[],"react/lib/ReactElementSymbol.js":[],"react/lib/getIteratorFn.js":[],"react/lib/checkReactTypeSpec.js":["react/lib/reactProdInvariant.js","react/lib/ReactPropTypeLocationNames.js","react/lib/ReactPropTypesSecret.js","fbjs/lib/invariant.js","fbjs/lib/warning.js","react/lib/ReactComponentTreeHook.js","react/lib/ReactComponentTreeHook.js","process/browser.js"],"process/browser.js":["process/browser.js"],"react-dom/lib/ReactOwner.js":["react-dom/lib/reactProdInvariant.js","fbjs/lib/invariant.js"],"react-dom/lib/validateDOMNesting.js":["object-assign/index.js","fbjs/lib/emptyFunction.js","fbjs/lib/warning.js"],"react-dom/lib/adler32.js":[],"react-dom/lib/ReactInvalidSetStateWarningHook.js":["fbjs/lib/warning.js"],"react-dom/lib/ReactHostOperationHistoryHook.js":[],"fbjs/lib/performanceNow.js":["fbjs/lib/performance.js"],"react-dom/lib/FallbackCompositionState.js":["object-assign/index.js","react-dom/lib/PooledClass.js","react-dom/lib/getTextContentAccessor.js"],"react-dom/lib/SyntheticCompositionEvent.js":["react-dom/lib/SyntheticEvent.js"],"react-dom/lib/SyntheticInputEvent.js":["react-dom/lib/SyntheticEvent.js"],"react-dom/lib/isTextInputElement.js":[],"react-dom/lib/AutoFocusUtils.js":["react-dom/lib/ReactDOMComponentTree.js","fbjs/lib/focusNode.js"],"react-dom/lib/CSSPropertyOperations.js":["react-dom/lib/CSSProperty.js","fbjs/lib/ExecutionEnvironment.js","react-dom/lib/ReactInstrumentation.js","fbjs/lib/camelizeStyleName.js","react-dom/lib/dangerousStyleValue.js","fbjs/lib/hyphenateStyleName.js","fbjs/lib/memoizeStringOnly.js","fbjs/lib/warning.js"],"react-dom/lib/DOMPropertyOperations.js":["react-dom/lib/DOMProperty.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactInstrumentation.js","react-dom/lib/quoteAttributeValueForBrowser.js","fbjs/lib/warning.js"],"react-dom/lib/ReactDOMInput.js":["react-dom/lib/reactProdInvariant.js","object-assign/index.js","react-dom/lib/DOMPropertyOperations.js","react-dom/lib/LinkedValueUtils.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactUpdates.js","fbjs/lib/invariant.js","fbjs/lib/warning.js"],"react-dom/lib/ReactDOMOption.js":["object-assign/index.js","react/lib/React.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactDOMSelect.js","fbjs/lib/warning.js"],"react-dom/lib/ReactMultiChild.js":["react-dom/lib/reactProdInvariant.js","react-dom/lib/ReactComponentEnvironment.js","react-dom/lib/ReactInstanceMap.js","react-dom/lib/ReactInstrumentation.js","react/lib/ReactCurrentOwner.js","react-dom/lib/ReactReconciler.js","react-dom/lib/ReactChildReconciler.js","fbjs/lib/emptyFunction.js","react-dom/lib/flattenChildren.js","fbjs/lib/invariant.js"],"react-dom/lib/ReactDOMSelect.js":["object-assign/index.js","react-dom/lib/LinkedValueUtils.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactUpdates.js","fbjs/lib/warning.js"],"react-dom/lib/ReactDOMTextarea.js":["react-dom/lib/reactProdInvariant.js","object-assign/index.js","react-dom/lib/LinkedValueUtils.js","react-dom/lib/ReactDOMComponentTree.js","react-dom/lib/ReactUpdates.js","fbjs/lib/invariant.js","fbjs/lib/warning.js"],"react-dom/lib/ReactServerRenderingTransaction.js":["object-assign/index.js","react-dom/lib/PooledClass.js","react-dom/lib/Transaction.js","react-dom/lib/ReactInstrumentation.js","react-dom/lib/ReactServerUpdateQueue.js"],"react-dom/lib/escapeTextContentForBrowser.js":[],"fbjs/lib/shallowEqual.js":[],"fbjs/lib/EventListener.js":["fbjs/lib/emptyFunction.js"],"fbjs/lib/getUnboundedScrollPosition.js":[],"fbjs/lib/getActiveElement.js":[],"react-dom/lib/SyntheticAnimationEvent.js":["react-dom/lib/SyntheticEvent.js"],"react-dom/lib/SyntheticClipboardEvent.js":["react-dom/lib/SyntheticEvent.js"],"react-dom/lib/SyntheticFocusEvent.js":["react-dom/lib/SyntheticUIEvent.js"],"react-dom/lib/SyntheticKeyboardEvent.js":["react-dom/lib/SyntheticUIEvent.js","react-dom/lib/getEventCharCode.js","react-dom/lib/getEventKey.js","react-dom/lib/getEventModifierState.js"],"react-dom/lib/SyntheticDragEvent.js":["react-dom/lib/SyntheticMouseEvent.js"],"react-dom/lib/SyntheticTouchEvent.js":["react-dom/lib/SyntheticUIEvent.js","react-dom/lib/getEventModifierState.js"],"react-dom/lib/SyntheticTransitionEvent.js":["react-dom/lib/SyntheticEvent.js"],"react-dom/lib/SyntheticWheelEvent.js":["react-dom/lib/SyntheticMouseEvent.js"],"react-dom/lib/getEventCharCode.js":[],"fbjs/lib/performance.js":["fbjs/lib/ExecutionEnvironment.js"],"react-dom/lib/accumulateInto.js":["react-dom/lib/reactProdInvariant.js","fbjs/lib/invariant.js"],"react-dom/lib/forEachAccumulated.js":[],"react-dom/lib/ReactErrorUtils.js":[],"react-dom/lib/getEventKey.js":["react-dom/lib/getEventCharCode.js"],"fbjs/lib/createNodesFromMarkup.js":["fbjs/lib/ExecutionEnvironment.js","fbjs/lib/createArrayFromMixed.js","fbjs/lib/getMarkupWrap.js","fbjs/lib/invariant.js"],"prop-types/lib/ReactPropTypesSecret.js":[],"prop-types/checkPropTypes.js":["fbjs/lib/invariant.js","fbjs/lib/warning.js","prop-types/lib/ReactPropTypesSecret.js"],"fbjs/lib/createArrayFromMixed.js":["fbjs/lib/invariant.js"],"fbjs/lib/getMarkupWrap.js":["fbjs/lib/ExecutionEnvironment.js","fbjs/lib/invariant.js"],"react-dom/lib/getTextContentAccessor.js":["fbjs/lib/ExecutionEnvironment.js"],"react-dom/lib/ReactServerUpdateQueue.js":["react-dom/lib/ReactUpdateQueue.js","fbjs/lib/warning.js"],"react-dom/lib/ReactDOMSelection.js":["fbjs/lib/ExecutionEnvironment.js","react-dom/lib/getNodeForCharacterOffset.js","react-dom/lib/getTextContentAccessor.js"],"fbjs/lib/containsNode.js":["fbjs/lib/isTextNode.js"],"fbjs/lib/focusNode.js":[],"fbjs/lib/isTextNode.js":["fbjs/lib/isNode.js"],"fbjs/lib/isNode.js":[],"react/lib/getNextDebugID.js":[],"react-dom/lib/ReactCompositeComponent.js":["react-dom/lib/reactProdInvariant.js","object-assign/index.js","react/lib/React.js","react-dom/lib/ReactComponentEnvironment.js","react/lib/ReactCurrentOwner.js","react-dom/lib/ReactErrorUtils.js","react-dom/lib/ReactInstanceMap.js","react-dom/lib/ReactInstrumentation.js","react-dom/lib/ReactNodeTypes.js","react-dom/lib/ReactReconciler.js","react-dom/lib/checkReactTypeSpec.js","fbjs/lib/emptyObject.js","fbjs/lib/invariant.js","fbjs/lib/shallowEqual.js","react-dom/lib/shouldUpdateReactComponent.js","fbjs/lib/warning.js"],"react/lib/KeyEscapeUtils.js":[],"react/lib/ReactPropTypesSecret.js":[],"react-dom/lib/quoteAttributeValueForBrowser.js":["react-dom/lib/escapeTextContentForBrowser.js"],"react-dom/lib/CSSProperty.js":[],"fbjs/lib/camelizeStyleName.js":["fbjs/lib/camelize.js"],"react-dom/lib/dangerousStyleValue.js":["react-dom/lib/CSSProperty.js","fbjs/lib/warning.js"],"fbjs/lib/hyphenateStyleName.js":["fbjs/lib/hyphenate.js"],"react-dom/lib/LinkedValueUtils.js":["react-dom/lib/reactProdInvariant.js","react-dom/lib/ReactPropTypesSecret.js","prop-types/factory.js","react/lib/React.js","fbjs/lib/invariant.js","fbjs/lib/warning.js"],"fbjs/lib/memoizeStringOnly.js":[],"react-dom/lib/ReactChildReconciler.js":["react-dom/lib/ReactReconciler.js","react-dom/lib/instantiateReactComponent.js","react-dom/lib/KeyEscapeUtils.js","react-dom/lib/shouldUpdateReactComponent.js","react-dom/lib/traverseAllChildren.js","fbjs/lib/warning.js","react/lib/ReactComponentTreeHook.js","react/lib/ReactComponentTreeHook.js","process/browser.js"],"react-dom/lib/flattenChildren.js":["react-dom/lib/KeyEscapeUtils.js","react-dom/lib/traverseAllChildren.js","fbjs/lib/warning.js","react/lib/ReactComponentTreeHook.js","react/lib/ReactComponentTreeHook.js","process/browser.js"],"fbjs/lib/hyphenate.js":[],"fbjs/lib/camelize.js":[],"react-dom/lib/getNodeForCharacterOffset.js":[],"react-dom/lib/checkReactTypeSpec.js":["react-dom/lib/reactProdInvariant.js","react-dom/lib/ReactPropTypeLocationNames.js","react-dom/lib/ReactPropTypesSecret.js","fbjs/lib/invariant.js","fbjs/lib/warning.js","react/lib/ReactComponentTreeHook.js","react/lib/ReactComponentTreeHook.js","process/browser.js"],"react-dom/lib/traverseAllChildren.js":["react-dom/lib/reactProdInvariant.js","react/lib/ReactCurrentOwner.js","react-dom/lib/ReactElementSymbol.js","react-dom/lib/getIteratorFn.js","fbjs/lib/invariant.js","react-dom/lib/KeyEscapeUtils.js","fbjs/lib/warning.js","process/browser.js"],"react-dom/lib/KeyEscapeUtils.js":[],"react-dom/lib/ReactPropTypesSecret.js":[],"react-dom/lib/ReactPropTypeLocationNames.js":[],"react-dom/lib/ReactElementSymbol.js":[],"react-dom/lib/getIteratorFn.js":[],"models/cell.ts":[]}, function(require) {

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/app.tsx", function(exports, require, module) {
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var board_1 = require("./board");
var cell_1 = require("../models/cell");
var config_1 = require("../config");
var AppComponent = (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent() {
        var _this = _super.call(this) || this;
        _this.state = {
            cells: cell_1.createCells(config_1.WIN_X, config_1.WIN_Y, config_1.CELL_COUNT)
        };
        return _this;
    }
    AppComponent.prototype.start = function () {
        var _this = this;
        this.pausedInterval = setInterval(function () {
            _this.update();
        }, 1000);
    };
    AppComponent.prototype.pause = function () {
        clearInterval(this.pausedInterval);
    };
    AppComponent.prototype.simulate = function (cells) {
        var lifes = cell_1.cellsLife(cells);
        var counts = cell_1.cellsCount(lifes);
        var countsLife = cell_1.cellsCountLife(lifes, counts);
        var lifesSimulate = lifes.slice();
        countsLife.forEach(function (_a, index) {
            var life = _a.life, count = _a.count;
            if (life) {
                if (count <= 1) {
                    lifesSimulate[index] = false;
                }
                else if (count >= 4) {
                    lifesSimulate[index] = false;
                }
                else {
                    lifesSimulate[index] = true;
                }
            }
            else {
                if (count == 3) {
                    lifesSimulate[index] = true;
                }
                else {
                    lifesSimulate[index] = false;
                }
            }
        });
        return cell_1.updateCells(cells, lifesSimulate);
    };
    AppComponent.prototype.update = function () {
        var cells = this.simulate(this.state.cells);
        this.setState({ cells: cells });
    };
    AppComponent.prototype.componentWillMount = function () {
        this.start();
    };
    AppComponent.prototype.render = function () {
        var appStyle = {
            margin: "0px",
            padding: "0px",
        };
        return (React.createElement("div", { style: appStyle },
            React.createElement(board_1.BoardComponent, { cells: this.state.cells })));
    };
    return AppComponent;
}(React.Component));
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.js.map

});

;require.register("components/board.tsx", function(exports, require, module) {
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var cell_1 = require("./cell");
var config_1 = require("../config");
var BoardComponent = (function (_super) {
    __extends(BoardComponent, _super);
    function BoardComponent() {
        return _super.call(this) || this;
    }
    BoardComponent.prototype.render = function () {
        var boardStyle = {
            position: 'relative',
            margin: 'auto',
            width: config_1.WIN_X + ".px",
            height: config_1.WIN_Y + ".px",
            backgroundColor: "#efefef",
        };
        var boardStyleUl = {
            listStyleType: "none",
            margin: "0",
            padding: "0",
        };
        var cells = this.props.cells.map(function (cell, i) {
            return (React.createElement(cell_1.CellComponent, __assign({}, cell, { key: i })));
        });
        return (React.createElement("div", { style: boardStyle },
            React.createElement("ul", { style: boardStyleUl }, cells)));
    };
    return BoardComponent;
}(React.Component));
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.js.map

});

;require.register("components/cell.tsx", function(exports, require, module) {
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var CellComponent = (function (_super) {
    __extends(CellComponent, _super);
    function CellComponent(props) {
        return _super.call(this, props) || this;
    }
    CellComponent.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height, left = _a.left, top = _a.top, life = _a.life;
        var cellStyle = {
            position: 'absolute',
            width: width - 1 + "px",
            height: height - 1 + "px",
            left: left + "px",
            top: top + "px",
            backgroundColor: life ? "green" : "red",
        };
        return (React.createElement("li", { style: cellStyle }));
    };
    return CellComponent;
}(React.Component));
exports.CellComponent = CellComponent;
//# sourceMappingURL=cell.js.map

});

;require.register("config.ts", function(exports, require, module) {
"use strict";
exports.WIN_X = 500;
exports.WIN_Y = 500;
exports.CELL_SCALE = 50;
exports.CELL_COUNT = Math.pow(exports.CELL_SCALE, 2);
//# sourceMappingURL=config.js.map

});

;require.register("initialize.tsx", function(exports, require, module) {
"use strict";
var ReactDOM = require("react-dom");
var React = require("react");
var app_1 = require("./components/app");
if (module.hot) {
    module.hot.accept();
}
var load = function () {
    ReactDOM.render(React.createElement(app_1.AppComponent, null), document.querySelector('#app'));
};
if (document.readyState !== 'complete') {
    document.addEventListener('DOMContentLoaded', load);
}
else {
    load();
}
//# sourceMappingURL=initialize.js.map

});

;require.register("models/cell.ts", function(exports, require, module) {
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
function createCells(width, height, count) {
    var sizeX = Math.sqrt(width * height / count);
    var sizeY = Math.sqrt(width * height / count);
    var countX = Math.sqrt(count);
    var countY = Math.sqrt(count);
    var cells = new Array();
    // create the cells
    for (var i = 0; i < count; i++) {
        var cellProps = {
            width: sizeX,
            height: sizeY,
            left: (i % countX) * sizeX,
            top: (Math.floor(i / countY)) * sizeY,
            life: Math.random() <= 0.5 ? false : true,
        };
        cells.push(cellProps);
    }
    return cells;
}
exports.createCells = createCells;
function cellsLife(cells) {
    return cells.map(function (cell) { return cell.life; });
}
exports.cellsLife = cellsLife;
function cellsCount(cells) {
    var offset = Math.sqrt(cells.length);
    return cells
        .map(function (cell, index) {
        var left = cells[index - 1] || false;
        var right = cells[index + 1] || false;
        var up = cells[index - offset] || false;
        var down = cells[index + offset] || false;
        var leftUp = cells[index - offset - 1] || false;
        var rightUp = cells[index - offset + 1] || false;
        var leftDown = cells[index + offset - 1] || false;
        var rightDown = cells[index + offset + 1] || false;
        return [left, right, up, down, leftUp, leftDown, rightUp, rightDown]
            .reduce(function (previous, current) {
            return current ? previous + 1 : previous;
        }, 0);
    });
}
exports.cellsCount = cellsCount;
function cellsCountLife(cells, counts) {
    var lifesCounts = new Array();
    for (var i = 0; i < cells.length; i++) {
        lifesCounts.push({
            life: cells[i],
            count: counts[i]
        });
    }
    return lifesCounts;
}
exports.cellsCountLife = cellsCountLife;
function updateCells(cells, life) {
    var cellsUpdated = new Array();
    for (var i = 0; i < cells.length; i++) {
        cellsUpdated.push(__assign({}, cells[i], { life: life[i] }));
    }
    return cellsUpdated;
}
exports.updateCells = updateCells;
//# sourceMappingURL=cell.js.map

});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

});// hmr end
//# sourceMappingURL=app.js.map