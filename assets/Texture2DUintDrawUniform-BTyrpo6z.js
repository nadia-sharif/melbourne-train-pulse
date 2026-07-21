import{t as e}from"./uid-tFVEb1ZF.js";import{r as t}from"./tslib.es6-qUHyP9zl.js";import{K as n}from"./BufferView-YI8uXCt4.js";import{i as r}from"./Util-CgCGvHb_.js";import{t as i}from"./Uniform-FnPH-ujw.js";import{n as a,t as o}from"./glsl-D85RBwKC.js";import{t as s}from"./FloatBindUniform-C4h6J6-v.js";import{n as c,t as l}from"./ShaderTechniqueConfiguration-DvmPjakj.js";function u(e){switch(e.elementType){case`float`:switch(e.elementCount){case 1:return a`float`;case 2:return a`vec2`;case 3:return a`vec3`;case 4:return a`vec4`;case 9:return a`mat3`;default:e.elementCount}break;case`int`:switch(e.elementCount){case 1:return a`int`;case 2:return a`ivec2`;case 3:return a`ivec3`;case 4:return a`ivec4`;case 9:throw Error(`Invalid element count 9 for type int`);default:e.elementCount}break;case`uint`:switch(e.elementCount){case 1:return a`uint`;case 2:return a`uvec2`;case 3:return a`uvec3`;case 4:return a`uvec4`;case 9:throw Error(`Invalid element count 9 for type uint`);default:e.elementCount}break;default:e.elementType}throw Error(`unsupported field`)}var d=new s(`constNaN`,()=>NaN,{supportsNaN:!0}),f=class extends l{constructor(e){super(),this.supportNaN=e}};function p(e,t){let n=t?.supportNaN;n&&(e.uniforms.add(d),e.code.add(a`bool bitsEncodeFloat16NaN(highp uint bits) {
const highp uint nanExponent = 0x00007c00u;
highp uint exponent = bits & nanExponent;
highp uint mantissa = bits & 0x000003ffu;
return exponent == nanExponent && mantissa != 0u;
}`)),e.code.add(a`
    mediump float unpackHalf1x16(highp uint bits) {
      ${o(n,a`
        if (bitsEncodeFloat16NaN(bits)) {
          return constNaN;
        }`)}
      return unpackHalf2x16(bits).x;
    }`),e.code.add(a`
    mediump vec2 unpackHalf2x16NaNSupport(highp uint bits) {
      vec2 result = unpackHalf2x16(bits);
      ${o(n,a`
        if (bitsEncodeFloat16NaN(bits)) {
          result.x = constNaN;
        }
        if (bitsEncodeFloat16NaN(bits >> ${a.uint(E[2])})) {
          result.y = constNaN;
        }
        `)}
      return result;
    }`)}function m(e,t){let n=t?.supportNaN;n&&(e.uniforms.add(d),e.code.add(a`bool bitsEncodeFloat32NaN(highp uint bits) {
const highp uint nanExponent = 0x7f800000u;
highp uint exponent = bits & nanExponent;
highp uint mantissa = bits & 0x007fffffu;
return exponent == nanExponent && mantissa != 0u;
}`)),e.code.add(a`
    highp float unpackFloat1x32(highp uint bits) {
      ${o(n,a`
        if (bitsEncodeFloat32NaN(bits)) {
          return constNaN;
        }`)}
      return uintBitsToFloat(bits);
    }`)}function h(e){e.code.add(a`mediump int unpackInt1x16(highp uint bits) {
highp uint signExtendedBits = (bits & 0x8000u) != 0u ? (bits | 0xffff0000u) : bits;
return int(signExtendedBits);
}`)}function g(e,t){let{fieldType:n}=e;return`${(0,C[n])(w(e,t))}`}function _(e,t){let n=[];for(let t of e){let e=a`unpackFloat1x32(${t})`;n.push(e)}return n.join(t)}t([c()],f.prototype,`supportNaN`,void 0);var v=e=>a`${e[0]}`,y=e=>a`((uvec4(${e[0]}) >> ${a`uvec4(${a.uint(E[0])}, ${a.uint(E[1])}, ${a.uint(E[2])}, ${a.uint(E[3])})`}) & ${a`uvec4(${a.hexuint(D[1])})`})`,b=e=>a`(float(${v(e)})/${a.float(255)})`,x=e=>a`unpackFloat1x32(${e[0]})`,S=e=>a`vec4(${_(e,`, `)})`,C={u8:v,unorm8:b,vec4unorm8:e=>a`(vec4(${y(e)})/${a.float(255)})`,snorm16:e=>a`unpackSnorm2x16(${e[0]}).x`,vec2snorm16:e=>a`unpackSnorm2x16(${e[0]})`,f16:n?e=>a`unpackHalf1x16(${e[0]})`:x,vec4f16:n?e=>a`vec4(unpackHalf2x16NaNSupport(${e[0]}), unpackHalf2x16NaNSupport(${e[1]}))`:S,f32:x,vec4u8:y,vec2f32:e=>a`vec2(${_(e,`, `)})`,vec3f32:e=>a`vec3(${_(e,`, `)})`,vec4f32:S,mat3f32:e=>a`mat3(${_(e,`,
`)})`};function w(e,t){let{byteOffset:n,byteSize:r}=e,i=t.channelByteStride,o=t.byteStride,s=Math.ceil(r/T),c=O[t.channels],l=[];for(let e=0;e<s;++e){let t=e*T,s=n+t,u=r-t,d=Math.min(u,T),f=0,p=[];for(;f<d;){let e=s+f,t=Math.floor(e/o),n=e%o,r=Math.floor(n/i),l=n%i,u=i-l,m=d-f,h=Math.min(u,m),g=a`texel${a.int(t)}${c[r]}`,_=h===4?``:a` & ${a.hexuint(D[h])}`,v=a`(${a`((${g}${l===0?``:a` >> ${a.uint(E[l])}`})${_})`})${f===0?``:a` << ${a.uint(E[f])}`}`;p.push(v),f+=h}l.push(a`(${p.join(` | `)})`)}return l}var T=4,E=[0,8,16,24],D=[0,255,65535,16777215,4294967295],O={1:[a``],2:[a`.x`,a`.y`],4:[a`.x`,a`.y`,a`.z`,a`.w`]},k=new f(!0),A=new f(!1),j=class{constructor(t){this.moduleId=e(),this.namespace=`_tbb_${this.moduleId}_`;let{itemIndexAttribute:n,bufferUniform:r,layout:i}=t,a=t.fieldFilter??(()=>!0),o=t.enableNaNSupport?k:A;this.TextureBackedBufferModule=(e,t)=>M(this.namespace,e,t,n,r,i,a,o),this.getTextureAttribute=N(this.namespace)}};function M(e,t,n,i,o,s,c,l){let{vertex:d}=t,{texelFormatInfo:f}=s;d.include(m,l),d.include(p,l),d.include(h);let _=`${e}tbbStride`,v=`${e}TextureBackedBufferItemData`,y=`${e}fetchTextureBackedBufferItemData`,b=P(e);for(let e of[_,v,y,b])r(e.length<1024,`Identifiers do not have a valid length`);d.constants.add(_,`uint`,s.texelStride),d.uniforms.add(o);let x=[];for(let e of s.fields.values())c(e.name,n)&&x.push(e);if(x.length===0)return;let S=[];for(let e=0;e<s.texelStride;++e)S.push(!1);for(let e of x)for(let t=0;t<e.numTexels;++t)S[e.startTexel+t]=!0;d.code.add(a`
  struct ${v} {`);for(let e of x)d.code.add(a`\t${u(e)} ${e.name};`);d.code.add(a`};`),d.code.add(a`
  ${v} ${y}(highp uint itemIndex) {
    ${v} itemData;
    highp uint index = itemIndex * ${_};
    highp uint rowWidth = uint(textureSize(${o.name}, 0).x);
    int coordX = int(index % rowWidth);
    int coordY = int(index / rowWidth);
  `);let C=F[f.channels],w=I[f.channels];for(let e=0;e<S.length;++e)!1!==S[e]&&d.code.add(a`highp ${C} texel${a.int(e)} = texelFetch(${o.name}, ivec2(coordX + ${a.int(e)}, coordY), 0)${w};`);for(let e of x)d.code.add(a`itemData.${e.name} = ${g(e,f)};`);d.code.add(a`return itemData;
}`),d.code.add(a`${v} ${b};`),d.main.add(a`${b} = ${y}(${i});`)}function N(e){let t=P(e);return e=>a`${t}.${e}`}function P(e){return`${e}ItemData`}var F={1:a`uint`,2:a`uvec2`,4:a`uvec4`},I={1:a`.x`,2:a`.xy`,4:``},L=class extends i{constructor(e,t){super(e,`usampler2D`,2,(n,r,i)=>n.bindTexture(e,t(r,i)))}};export{j as n,L as t};