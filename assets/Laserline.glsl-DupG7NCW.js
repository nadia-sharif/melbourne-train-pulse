import{c as e}from"./vec3f64-DIOQknMY.js";import{_ as t}from"./mathUtils-D79yUFwW.js";import{D as n}from"./vec2-C5dJMieJ.js";import{A as r,C as i,b as a,d as o,j as s,p as c,x as l,y as u}from"./vec3-C5q_s_3T.js";import{g as d}from"./vec4-B-G2J025.js";import{o as f}from"./vec4f64-CjgU5APJ.js";import{o as p}from"./vec2f64-IO40D2xB.js";import{t as m}from"./lineSegment-BSSoLxDT.js";import{m as h,x as g}from"./plane-8bvi8oVn.js";import{t as _}from"./Float3PassUniform-YEiGS05C.js";import{n as v}from"./glsl-D85RBwKC.js";import{t as y}from"./Float3BindUniform-BmdF9XGj.js";import{t as b}from"./FloatBindUniform-C4h6J6-v.js";import{t as x}from"./Float4PassUniform-Cu2daSgY.js";import{t as S}from"./FloatPassUniform-DeUP8HjM.js";import{t as C}from"./Float2PassUniform-BYZ61_RB.js";import{t as w}from"./ScreenSpacePass.glsl-9L-_X5OK.js";import{t as T}from"./ShaderBuilder-8uuwgR05.js";import{t as E}from"./Laserline.glsl-DRk4yDSo.js";var D=t(6);function O(e){let t=new T;t.include(w),t.include(E,e);let n=t.fragment;if(e.lineVerticalPlaneEnabled||e.heightManifoldEnabled)if(n.uniforms.add(new S(`maxPixelDistance`,(t,n)=>e.heightManifoldEnabled?2*n.camera.computeScreenPixelSizeAt(t.heightManifoldTarget):2*n.camera.computeScreenPixelSizeAt(t.lineVerticalPlaneSegment.origin))),n.code.add(v`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),e.spherical){let e=(e,t,n)=>c(e,t.heightManifoldTarget,n.camera.viewMatrix),t=(e,t)=>c(e,[0,0,0],t.camera.viewMatrix);n.uniforms.add(new x(`heightManifoldOrigin`,(n,r)=>(e(I,n,r),t(z,r),l(z,z,I),u(L,z),L[3]=a(z),L)),new y(`globalOrigin`,e=>t(I,e)),new S(`cosSphericalAngleThreshold`,(e,t)=>1-Math.max(2,s(t.camera.eye,e.heightManifoldTarget)*t.camera.perRenderPixelRatio)/a(e.heightManifoldTarget))),n.code.add(v`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else n.code.add(v`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(e.pointDistanceEnabled&&(n.uniforms.add(new S(`maxPixelDistance`,(e,t)=>2*t.camera.computeScreenPixelSizeAt(e.pointDistanceTarget))),n.code.add(v`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),e.intersectsLineEnabled&&n.uniforms.add(new b(`perScreenPixelRatio`,e=>e.camera.perScreenPixelRatio)).code.add(v`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);
return abs(dist) - radius;
}`),(e.lineVerticalPlaneEnabled||e.intersectsLineEnabled)&&n.code.add(v`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),n.main.add(v`vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
fragColor = vec4(0.0);
return;
}
vec4 color = vec4(0.0);`),e.heightManifoldEnabled){n.uniforms.add(new C(`angleCutoff`,e=>k(e)),new x(`heightPlane`,(e,t)=>P(e.heightManifoldTarget,e.renderCoordsHelper.worldUpAtPosition(e.heightManifoldTarget,I),t.camera.viewMatrix)));let t=e.spherical?v`normalize(globalOrigin - pos)`:v`heightPlane.xyz`;n.main.add(v`
      vec2 angleCutoffAdjusted = angleCutoff - angleCutoffAdjust;
      // Fade out laserlines on flat surfaces
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoffAdjusted.x, angleCutoffAdjusted.y, abs(dot(normal, ${t})));
      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);`)}return e.pointDistanceEnabled&&(n.uniforms.add(new C(`angleCutoff`,e=>k(e)),new x(`pointDistanceSphere`,(e,t)=>A(e,t))),n.main.add(v`float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);`)),e.lineVerticalPlaneEnabled&&(n.uniforms.add(new C(`angleCutoff`,e=>k(e)),new x(`lineVerticalPlane`,(e,t)=>j(e,t)),new _(`lineVerticalStart`,(e,t)=>M(e,t)),new _(`lineVerticalEnd`,(e,t)=>N(e,t))),n.main.add(v`if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}`)),e.intersectsLineEnabled&&(n.uniforms.add(new C(`angleCutoff`,e=>k(e)),new _(`intersectsLineStart`,(e,t)=>c(I,e.lineStartWorld,t.camera.viewMatrix)),new _(`intersectsLineEnd`,(e,t)=>c(I,e.lineEndWorld,t.camera.viewMatrix)),new _(`intersectsLineDirection`,(e,t)=>(r(L,e.intersectsLineSegment.vector),L[3]=0,u(I,d(L,L,t.camera.viewMatrix)))),new S(`intersectsLineRadius`,e=>e.intersectsLineRadius)),n.main.add(v`if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}`)),n.main.add(v`fragColor = laserlineOutput(color * depthDiscontinuityAlpha);`),t}function k(e){return n(F,Math.cos(e.angleCutoff),Math.cos(Math.max(0,e.angleCutoff-t(2))))}function A(e,t){return c(H,e.pointDistanceOrigin,t.camera.viewMatrix),H[3]=s(e.pointDistanceOrigin,e.pointDistanceTarget),H}function j(e,t){let n=m(e.lineVerticalPlaneSegment,.5,I),r=o(I,e.renderCoordsHelper.worldUpAtPosition(n,R),u(z,e.lineVerticalPlaneSegment.vector));return u(r,r),P(e.lineVerticalPlaneSegment.origin,r,t.camera.viewMatrix)}function M(e,t){let n=r(I,e.lineVerticalPlaneSegment.origin);return e.renderCoordsHelper.setAltitude(n,0),c(n,n,t.camera.viewMatrix)}function N(e,t){let n=i(I,e.lineVerticalPlaneSegment.origin,e.lineVerticalPlaneSegment.vector);return e.renderCoordsHelper.setAltitude(n,0),c(n,n,t.camera.viewMatrix)}function P(e,t,n){return c(B,e,n),r(L,t),L[3]=0,d(L,L,n),h(B,L,V)}var F=p(),I=e(),L=f(),R=e(),z=e(),B=e(),V=g(),H=f(),U=Object.freeze(Object.defineProperty({__proto__:null,build:O,defaultAngleCutoff:D},Symbol.toStringTag,{value:`Module`}));export{U as n,O as r,D as t};