
			/* Based on Alex Arnell's inheritance implementation. */
			var Class = {
			  create: function() {
			    var parent = null, properties = $A(arguments);
			    if (Object.isFunction(properties[0]))
			      parent = properties.shift();

			    function klass() {
			      this.initialize.apply(this, arguments);
			    }

			    Object.extend(klass, Class.Methods);
			    klass.superclass = parent;
			    klass.subclasses = [];

			    if (parent) {
			      var subclass = function() { };
			      subclass.prototype = parent.prototype;
			      klass.prototype = new subclass;
			      parent.subclasses.push(klass);
			    }

			    for (var i = 0; i < properties.length; i++)
			      klass.addMethods(properties[i]);

			    if (!klass.prototype.initialize)
			      klass.prototype.initialize = this.emptyFunction;

			    klass.prototype.constructor = klass;

			    return klass;
			  },
			  emptyFunction:function () {},

			};

			Class.Methods = {
			  addMethods: function(source) {
			    var ancestor   = this.superclass && this.superclass.prototype;
			    var properties = Object.keys(source);

			    if (!Object.keys({ toString: true }).length)
			      properties.push("toString", "valueOf");

			    for (var i = 0, length = properties.length; i < length; i++) {
			      var property = properties[i], value = source[property];
			      if (ancestor && Object.isFunction(value) &&
				  value.argumentNames().first() == "$super") {
				var method = value, value = Object.extend((function(m) {
				  return function() { return ancestor[m].apply(this, arguments) };
				})(property).wrap(method), {
				  valueOf:  function() { return method },
				  toString: function() { return method.toString() }
				});
			      }
			      this.prototype[property] = value;
			    }

			    return this;
			  }
			};

			Object.extend = function(destination, source) {
			  for (var property in source)
			    destination[property] = source[property];
			  return destination;
			};

			Object.extend(Object, {
			  inspect: function(object) {
			    try {
			      if (Object.isUndefined(object)) return 'undefined';
			      if (object === null) return 'null';
			      return object.inspect ? object.inspect() : String(object);
			    } catch (e) {
			      if (e instanceof RangeError) return '...';
			      throw e;
			    }
			  },

			  toJSON: function(object) {
			    var type = typeof object;
			    switch (type) {
			      case 'undefined':
			      case 'function':
			      case 'unknown': return;
			      case 'boolean': return object.toString();
			    }

			    if (object === null) return 'null';
			    if (object.toJSON) return object.toJSON();
			    if (Object.isElement(object)) return;

			    var results = [];
			    for (var property in object) {
			      var value = Object.toJSON(object[property]);
			      if (!Object.isUndefined(value))
				results.push(property.toJSON() + ': ' + value);
			    }

			    return '{' + results.join(', ') + '}';
			  },

			  toQueryString: function(object) {
			    return $H(object).toQueryString();
			  },

			  toHTML: function(object) {
			    return object && object.toHTML ? object.toHTML() : String.interpret(object);
			  },

			  keys: function(object) {
			    var keys = [];
			    for (var property in object)
			      keys.push(property);
			    return keys;
			  },

			  values: function(object) {
			    var values = [];
			    for (var property in object)
			      values.push(object[property]);
			    return values;
			  },

			  clone: function(object) {
			    return Object.extend({ }, object);
			  },

			  isElement: function(object) {
			    return object && object.nodeType == 1;
			  },

			  isArray: function(object) {
			    return object != null && typeof object == "object" &&
			      'splice' in object && 'join' in object;
			  },

			  isHash: function(object) {
			    return object instanceof Hash;
			  },

			  isFunction: function(object) {
			    return typeof object == "function";
			  },

			  isString: function(object) {
			    return typeof object == "string";
			  },

			  isNumber: function(object) {
			    return typeof object == "number";
			  },

			  isUndefined: function(object) {
			    return typeof object == "undefined";
			  }
			});

			function $A(iterable) {
			  if (!iterable) return [];
			  if (iterable.toArray) return iterable.toArray();
			  var length = iterable.length || 0, results = new Array(length);
			  while (length--) results[length] = iterable[length];
			  return results;
			}

			if (WebKit = navigator.userAgent.indexOf('AppleWebKit/') > -1) {
			  $A = function(iterable) {
			    if (!iterable) return [];
			    if (!(Object.isFunction(iterable) && iterable == '[object NodeList]') &&
				iterable.toArray) return iterable.toArray();
			    var length = iterable.length || 0, results = new Array(length);
			    while (length--) results[length] = iterable[length];
			    return results;
			  };
			}

		



/* 
			 * Box2Djs (port of Box2DFlash 1.4.3.1) - http://box2d-js.sourceforge.net/
			 * Single-filed and jsmined ( http://code.google.com/p/jsmin-php/ ) by Mr.doob
			 */
			
			
			var b2Settings=Class.create();b2Settings.prototype={initialize:function(){}}
			b2Settings.USHRT_MAX=0x0000ffff;b2Settings.b2_pi=Math.PI;b2Settings.b2_massUnitsPerKilogram=1.0;b2Settings.b2_timeUnitsPerSecond=1.0;b2Settings.b2_lengthUnitsPerMeter=30.0;b2Settings.b2_maxManifoldPoints=2;b2Settings.b2_maxShapesPerBody=64;b2Settings.b2_maxPolyVertices=8;b2Settings.b2_maxProxies=1024;b2Settings.b2_maxPairs=8*b2Settings.b2_maxProxies;b2Settings.b2_linearSlop=0.005*b2Settings.b2_lengthUnitsPerMeter;b2Settings.b2_angularSlop=2.0/180.0*b2Settings.b2_pi;b2Settings.b2_velocityThreshold=1.0*b2Settings.b2_lengthUnitsPerMeter/b2Settings.b2_timeUnitsPerSecond;b2Settings.b2_maxLinearCorrection=0.2*b2Settings.b2_lengthUnitsPerMeter;b2Settings.b2_maxAngularCorrection=8.0/180.0*b2Settings.b2_pi;b2Settings.b2_contactBaumgarte=0.2;b2Settings.b2_timeToSleep=0.5*b2Settings.b2_timeUnitsPerSecond;b2Settings.b2_linearSleepTolerance=0.01*b2Settings.b2_lengthUnitsPerMeter/b2Settings.b2_timeUnitsPerSecond;b2Settings.b2_angularSleepTolerance=2.0/180.0/b2Settings.b2_timeUnitsPerSecond;b2Settings.b2Assert=function(a)
			{if(!a){var nullVec;nullVec.x++;}};
			var b2Vec2=Class.create();b2Vec2.prototype={initialize:function(x_,y_){this.x=x_;this.y=y_;},SetZero:function(){this.x=0.0;this.y=0.0;},Set:function(x_,y_){this.x=x_;this.y=y_;},SetV:function(v){this.x=v.x;this.y=v.y;},Negative:function(){return new b2Vec2(-this.x,-this.y);},Copy:function(){return new b2Vec2(this.x,this.y);},Add:function(v)
			{this.x+=v.x;this.y+=v.y;},Subtract:function(v)
			{this.x-=v.x;this.y-=v.y;},Multiply:function(a)
			{this.x*=a;this.y*=a;},MulM:function(A)
			{var tX=this.x;this.x=A.col1.x*tX+A.col2.x*this.y;this.y=A.col1.y*tX+A.col2.y*this.y;},MulTM:function(A)
			{var tX=b2Math.b2Dot(this,A.col1);this.y=b2Math.b2Dot(this,A.col2);this.x=tX;},CrossVF:function(s)
			{var tX=this.x;this.x=s*this.y;this.y=-s*tX;},CrossFV:function(s)
			{var tX=this.x;this.x=-s*this.y;this.y=s*tX;},MinV:function(b)
			{this.x=this.x<b.x?this.x:b.x;this.y=this.y<b.y?this.y:b.y;},MaxV:function(b)
			{this.x=this.x>b.x?this.x:b.x;this.y=this.y>b.y?this.y:b.y;},Abs:function()
			{this.x=Math.abs(this.x);this.y=Math.abs(this.y);},Length:function()
			{return Math.sqrt(this.x*this.x+this.y*this.y);},Normalize:function()
			{var length=this.Length();if(length<Number.MIN_VALUE)
			{return 0.0;}
			var invLength=1.0/length;this.x*=invLength;this.y*=invLength;return length;},IsValid:function()
			{return b2Math.b2IsValid(this.x)&&b2Math.b2IsValid(this.y);},x:null,y:null};b2Vec2.Make=function(x_,y_)
			{return new b2Vec2(x_,y_);};
			var b2Mat22=Class.create();b2Mat22.prototype={initialize:function(angle,c1,c2)
			{if(angle==null)angle=0;this.col1=new b2Vec2();this.col2=new b2Vec2();if(c1!=null&&c2!=null){this.col1.SetV(c1);this.col2.SetV(c2);}
			else{var c=Math.cos(angle);var s=Math.sin(angle);this.col1.x=c;this.col2.x=-s;this.col1.y=s;this.col2.y=c;}},Set:function(angle)
			{var c=Math.cos(angle);var s=Math.sin(angle);this.col1.x=c;this.col2.x=-s;this.col1.y=s;this.col2.y=c;},SetVV:function(c1,c2)
			{this.col1.SetV(c1);this.col2.SetV(c2);},Copy:function(){return new b2Mat22(0,this.col1,this.col2);},SetM:function(m)
			{this.col1.SetV(m.col1);this.col2.SetV(m.col2);},AddM:function(m)
			{this.col1.x+=m.col1.x;this.col1.y+=m.col1.y;this.col2.x+=m.col2.x;this.col2.y+=m.col2.y;},SetIdentity:function()
			{this.col1.x=1.0;this.col2.x=0.0;this.col1.y=0.0;this.col2.y=1.0;},SetZero:function()
			{this.col1.x=0.0;this.col2.x=0.0;this.col1.y=0.0;this.col2.y=0.0;},Invert:function(out)
			{var a=this.col1.x;var b=this.col2.x;var c=this.col1.y;var d=this.col2.y;var det=a*d-b*c;det=1.0/det;out.col1.x=det*d;out.col2.x=-det*b;out.col1.y=-det*c;out.col2.y=det*a;return out;},Solve:function(out,bX,bY)
			{var a11=this.col1.x;var a12=this.col2.x;var a21=this.col1.y;var a22=this.col2.y;var det=a11*a22-a12*a21;det=1.0/det;out.x=det*(a22*bX-a12*bY);out.y=det*(a11*bY-a21*bX);return out;},Abs:function()
			{this.col1.Abs();this.col2.Abs();},col1:new b2Vec2(),col2:new b2Vec2()};
			var b2Math=Class.create();b2Math.prototype={initialize:function(){}}
			b2Math.b2IsValid=function(x)
			{return isFinite(x);};b2Math.b2Dot=function(a,b)
			{return a.x*b.x+a.y*b.y;};b2Math.b2CrossVV=function(a,b)
			{return a.x*b.y-a.y*b.x;};b2Math.b2CrossVF=function(a,s)
			{var v=new b2Vec2(s*a.y,-s*a.x);return v;};b2Math.b2CrossFV=function(s,a)
			{var v=new b2Vec2(-s*a.y,s*a.x);return v;};b2Math.b2MulMV=function(A,v)
			{var u=new b2Vec2(A.col1.x*v.x+A.col2.x*v.y,A.col1.y*v.x+A.col2.y*v.y);return u;};b2Math.b2MulTMV=function(A,v)
			{var u=new b2Vec2(b2Math.b2Dot(v,A.col1),b2Math.b2Dot(v,A.col2));return u;};b2Math.AddVV=function(a,b)
			{var v=new b2Vec2(a.x+b.x,a.y+b.y);return v;};b2Math.SubtractVV=function(a,b)
			{var v=new b2Vec2(a.x-b.x,a.y-b.y);return v;};b2Math.MulFV=function(s,a)
			{var v=new b2Vec2(s*a.x,s*a.y);return v;};b2Math.AddMM=function(A,B)
			{var C=new b2Mat22(0,b2Math.AddVV(A.col1,B.col1),b2Math.AddVV(A.col2,B.col2));return C;};b2Math.b2MulMM=function(A,B)
			{var C=new b2Mat22(0,b2Math.b2MulMV(A,B.col1),b2Math.b2MulMV(A,B.col2));return C;};b2Math.b2MulTMM=function(A,B)
			{var c1=new b2Vec2(b2Math.b2Dot(A.col1,B.col1),b2Math.b2Dot(A.col2,B.col1));var c2=new b2Vec2(b2Math.b2Dot(A.col1,B.col2),b2Math.b2Dot(A.col2,B.col2));var C=new b2Mat22(0,c1,c2);return C;};b2Math.b2Abs=function(a)
			{return a>0.0?a:-a;};b2Math.b2AbsV=function(a)
			{var b=new b2Vec2(b2Math.b2Abs(a.x),b2Math.b2Abs(a.y));return b;};b2Math.b2AbsM=function(A)
			{var B=new b2Mat22(0,b2Math.b2AbsV(A.col1),b2Math.b2AbsV(A.col2));return B;};b2Math.b2Min=function(a,b)
			{return a<b?a:b;};b2Math.b2MinV=function(a,b)
			{var c=new b2Vec2(b2Math.b2Min(a.x,b.x),b2Math.b2Min(a.y,b.y));return c;};b2Math.b2Max=function(a,b)
			{return a>b?a:b;};b2Math.b2MaxV=function(a,b)
			{var c=new b2Vec2(b2Math.b2Max(a.x,b.x),b2Math.b2Max(a.y,b.y));return c;};b2Math.b2Clamp=function(a,low,high)
			{return b2Math.b2Max(low,b2Math.b2Min(a,high));};b2Math.b2ClampV=function(a,low,high)
			{return b2Math.b2MaxV(low,b2Math.b2MinV(a,high));};b2Math.b2Swap=function(a,b)
			{var tmp=a[0];a[0]=b[0];b[0]=tmp;};b2Math.b2Random=function()
			{return Math.random()*2-1;};b2Math.b2NextPowerOfTwo=function(x)
			{x|=(x>>1)&0x7FFFFFFF;x|=(x>>2)&0x3FFFFFFF;x|=(x>>4)&0x0FFFFFFF;x|=(x>>8)&0x00FFFFFF;x|=(x>>16)&0x0000FFFF;return x+1;};b2Math.b2IsPowerOfTwo=function(x)
			{var result=x>0&&(x&(x-1))==0;return result;};b2Math.tempVec2=new b2Vec2();b2Math.tempVec3=new b2Vec2();b2Math.tempVec4=new b2Vec2();b2Math.tempVec5=new b2Vec2();b2Math.tempMat=new b2Mat22();
			var b2AABB=Class.create();b2AABB.prototype={IsValid:function(){var dX=this.maxVertex.x;var dY=this.maxVertex.y;dX=this.maxVertex.x;dY=this.maxVertex.y;dX-=this.minVertex.x;dY-=this.minVertex.y;var valid=dX>=0.0&&dY>=0.0;valid=valid&&this.minVertex.IsValid()&&this.maxVertex.IsValid();return valid;},minVertex:new b2Vec2(),maxVertex:new b2Vec2(),initialize:function(){this.minVertex=new b2Vec2();this.maxVertex=new b2Vec2();}};
			var b2Bound=Class.create();b2Bound.prototype={IsLower:function(){return(this.value&1)==0;},IsUpper:function(){return(this.value&1)==1;},Swap:function(b){var tempValue=this.value;var tempProxyId=this.proxyId;var tempStabbingCount=this.stabbingCount;this.value=b.value;this.proxyId=b.proxyId;this.stabbingCount=b.stabbingCount;b.value=tempValue;b.proxyId=tempProxyId;b.stabbingCount=tempStabbingCount;},value:0,proxyId:0,stabbingCount:0,initialize:function(){}}
			
			var b2BoundValues=Class.create();b2BoundValues.prototype={lowerValues:[0,0],upperValues:[0,0],initialize:function(){this.lowerValues=[0,0];this.upperValues=[0,0];}}
			
			var b2Pair=Class.create();b2Pair.prototype={SetBuffered:function(){this.status|=b2Pair.e_pairBuffered;},ClearBuffered:function(){this.status&=~b2Pair.e_pairBuffered;},IsBuffered:function(){return(this.status&b2Pair.e_pairBuffered)==b2Pair.e_pairBuffered;},SetRemoved:function(){this.status|=b2Pair.e_pairRemoved;},ClearRemoved:function(){this.status&=~b2Pair.e_pairRemoved;},IsRemoved:function(){return(this.status&b2Pair.e_pairRemoved)==b2Pair.e_pairRemoved;},SetFinal:function(){this.status|=b2Pair.e_pairFinal;},IsFinal:function(){return(this.status&b2Pair.e_pairFinal)==b2Pair.e_pairFinal;},userData:null,proxyId1:0,proxyId2:0,next:0,status:0,initialize:function(){}};b2Pair.b2_nullPair=b2Settings.USHRT_MAX;b2Pair.b2_nullProxy=b2Settings.USHRT_MAX;b2Pair.b2_tableCapacity=b2Settings.b2_maxPairs;b2Pair.b2_tableMask=b2Pair.b2_tableCapacity-1;b2Pair.e_pairBuffered=0x0001;b2Pair.e_pairRemoved=0x0002;b2Pair.e_pairFinal=0x0004;
			var b2PairCallback=Class.create();b2PairCallback.prototype={PairAdded:function(proxyUserData1,proxyUserData2){return null},PairRemoved:function(proxyUserData1,proxyUserData2,pairUserData){},initialize:function(){}};
			var b2BufferedPair=Class.create();b2BufferedPair.prototype={proxyId1:0,proxyId2:0,initialize:function(){}}
			
			var b2PairManager=Class.create();b2PairManager.prototype={initialize:function(){var i=0;this.m_hashTable=new Array(b2Pair.b2_tableCapacity);for(i=0;i<b2Pair.b2_tableCapacity;++i)
			{this.m_hashTable[i]=b2Pair.b2_nullPair;}
			this.m_pairs=new Array(b2Settings.b2_maxPairs);for(i=0;i<b2Settings.b2_maxPairs;++i)
			{this.m_pairs[i]=new b2Pair();}
			this.m_pairBuffer=new Array(b2Settings.b2_maxPairs);for(i=0;i<b2Settings.b2_maxPairs;++i)
			{this.m_pairBuffer[i]=new b2BufferedPair();}
			for(i=0;i<b2Settings.b2_maxPairs;++i)
			{this.m_pairs[i].proxyId1=b2Pair.b2_nullProxy;this.m_pairs[i].proxyId2=b2Pair.b2_nullProxy;this.m_pairs[i].userData=null;this.m_pairs[i].status=0;this.m_pairs[i].next=(i+1);}
			this.m_pairs[b2Settings.b2_maxPairs-1].next=b2Pair.b2_nullPair;this.m_pairCount=0;},Initialize:function(broadPhase,callback){this.m_broadPhase=broadPhase;this.m_call…
			
