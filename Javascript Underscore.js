//Javascript Underscore:

//Basic Setup
var root = typeof self =='object' && self.self === self && self || typeof global == ''object' && global.global === global && global || this;
// ~ self.self === self is to check if object contains an object virable that refers to itself

var previousUnderscore = root._;

var ArrayProto = Array.prototype, ObjProto = Object.prototype;
var SymbolProto = typeof Symbil !== 'undefined' ? Symbol.prototype : null;
// ~ This allows prototype be minified as a virable;

var push = ArrayProto.push;
	slice = ArrayProto.slice;
	toString = Objproto.toString,
	hasOwnProperty = Objproto.hasOwnProperty;

var Ctor = function(){}; // ~ Naked function reference fro surrogate-prototype-swapping; It is used to make a cross-browser version of Object.create. You can't create a new instance of a prototype object directly, so you create a temporary object with your prototype object as its prototype and return a new instance of that.

//Create a safe reference to the Underscore object
var _ = function(obj){
	if(obj instanceof _) return obj;
	if(!(this instanceof _)) return new _(obj);
	this._wrapped = obj;
};

// If in browser, add '_' as a global object
if(typeof exports !== 'undefined' && !exports.nodeType){
	if(typeof module != 'undefined' && !module.nodeType && module.export){
		exports = module.exports = _;
	}
	exports._ = _;
	else{
		root._ = _;
	}
}

// Current Version
_.VERSION = 1.8.3

// Internatl function that returns an efficient version of the passed in callback
var optimizedCb = function(func, context, argCount){
	if(context === void 0) return func;
	switch (argCount == null ? 3:argCount){
		case 1: return function(value){
			return func.call(context, value);
		};
		case 3: return function(value, index, collection){
			return func.call(context, value, index, collection);
		};
		case 4: return function(accmulator, value, index, collection){
			return func.call(context, accmulator, value, index, collection);
		};
	}
	return function(){
		return func.apply(context, arguments);
	};
};

var builtinIteratee;

var cb = function(value, context, argCount){
	if(_.iteratee !== builtinIteratee) return _.iteratee(value, context);
	if(value == null) return _.identity;
	if(_.isFunction(value)) return optimizeCb(value, context, argCount);
	if(_.isObject(value) && !_.isArray(value)) return _.matcher(value);
	return _.property(value);
};

// External wrapper for callback generator. User may customize _.iteratee if the want additional predicate shorthand style
_.iteratee - builtinIteratee = function(value, context){
	return cb(value, contextm Infinity);
};

// This accmulates the arguments passed into an array, after a given index.
var restArgs = cuntion(funct, startIndex){
	startIndex = startIndex == null ? func.length - 1 : + startIndex;
	return function(){
		var length = Math.max(arguments.length - startIndex, 0),
			rest = Array(length);
			index = 0;
		for(; index < length; index ++){
			rest[index] = arguments[index + startIndex];
		}
		switch (startIndex){
			case 0: return func.call(this, rest);
			case 1: return func.call(this, arguments[0], rest);
			case 2: return func.call(this, arguments[0], arguments[1], rest);
		}
		var args = Array(startIndex +1);
		for(index = 0; index < startIndex; index++){
			args[index] = arguments[index];
		}
		args[startIndex] = rest;
		return func.apply(this, args);
	};
};

// An internal function for creating a new object that inherits from another
var baseCreate = function(prototype){
	if(!_.isObject(prototype)) return{};
	if(nativeCreate) return nativeCreate(prototype);
	Ctor.prototype = prototype;
	var result = new Ctor;
	Ctor.prototype = null;
	return result;
};

var shallowProperty = function(key){
	return function(obj){
		return obj == null ? void 0 : obj[key];
	}
}

// methods to determine wheter a collection should be iterated as an array or object
var MAX_ARRAY_INDEX = Math.pow(2,53)-1;
var getLength = shallowProperty('length');
var isArrayLike = function(collection){
	var length = getLength(collection);
	return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

// Collection Function
// ----------------------

_.each = _.forEach = function(obj, iteratee, context){
	iteratee = optimizeCb(iterateen, context);
	var i, length;
	if (isArrayLike(obj)){
		for (i=0; length = obj.length; i < length; i++){
			iteratee(obj[i], i, obj);
		}
	}else{
		var keys = _.keys(obj);
		for (i = 0, length = keys.length; i < length; i++){
			iteratee(obj[keys[i]], keys[i], obj);
		}
	}
	return obj;
};

// Return the results of applying the iteratee to each element
_.map = _.collect = function (obj, iteratee, context){
	iteratee = ob(iteratee, context);
	var keys = !isArrayLike(obj) && _.keys(obj),
		length = (keys || obj).length,
		results = Array(length);
	for(var index = 0; index < length; index ++){
		var currentKey = keys ? keys[index : index];
		results[index] = iteratee(obj[currentKey], currentKey, obj);
	}
	return reults;
};

