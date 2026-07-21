import{t as e}from"./Float3PassUniform-YEiGS05C.js";import{n as t}from"./glsl-D85RBwKC.js";import{t as n}from"./FloatPassUniform-DeUP8HjM.js";import{t as r}from"./Texture2DBindUniform-4_yYNByJ.js";import{t as i}from"./ReadDepth.glsl-Ca_0z8Pl.js";import{t as a}from"./Texture2DPassUniform-CiCHIiok.js";import{t as o}from"./CameraSpace.glsl-LQZFWYSr.js";import{t as s}from"./BlendColorsPremultiplied.glsl-BnH2fynI.js";function c(c,l){let u=c.fragment;u.include(i),c.include(o),u.include(s),u.uniforms.add(new n(`globalAlpha`,e=>e.globalAlpha),new e(`glowColor`,e=>e.glowColor),new n(`glowWidth`,(e,t)=>e.glowWidth*t.camera.pixelRatio),new n(`glowFalloff`,e=>e.glowFalloff),new e(`innerColor`,e=>e.innerColor),new n(`innerWidth`,(e,t)=>e.innerWidth*t.camera.pixelRatio),new r(`depthMap`,e=>e.depth?.attachment),new a(`normalMap`,e=>e.normals)),u.code.add(t`vec4 premultipliedColor(vec3 rgb, float alpha) {
return vec4(rgb * alpha, alpha);
}`),u.code.add(t`vec4 laserlineProfile(float dist) {
if (dist > glowWidth) {
return vec4(0.0);
}
float innerAlpha = (1.0 - smoothstep(0.0, innerWidth, dist));
float glowAlpha = pow(max(0.0, 1.0 - dist / glowWidth), glowFalloff);
return blendColorsPremultiplied(
premultipliedColor(innerColor, innerAlpha),
premultipliedColor(glowColor, glowAlpha)
);
}`),u.code.add(t`bool laserlineReconstructFromDepth(out vec3 pos, out vec3 normal, out float angleCutoffAdjust, out float depthDiscontinuityAlpha) {
float depth = depthFromTexture(depthMap, uv);
if (depth == 1.0) {
return false;
}
float linearDepth = linearizeDepth(depth);
pos = reconstructPosition(gl_FragCoord.xy, linearDepth);
float minStep = 6e-8;
float depthStep = clamp(depth + minStep, 0.0, 1.0);
float linearDepthStep = linearizeDepth(depthStep);
float depthError = abs(linearDepthStep - linearDepth);
vec3 normalReconstructed = normalize(cross(dFdx(pos), dFdy(pos)));
vec3 normalFromTexture = normalize(texture(normalMap, uv).xyz * 2.0 - 1.0);
float blendFactor = smoothstep(0.15, 0.2, depthError);
normal = normalize(mix(normalReconstructed, normalFromTexture, blendFactor));
angleCutoffAdjust = mix(0.0, 0.004, blendFactor);
float ddepth = fwidth(linearDepth);
depthDiscontinuityAlpha = 1.0 - smoothstep(0.0, 0.01, -ddepth / linearDepth);
return true;
}`),l.contrastControlEnabled?u.uniforms.add(new a(`frameColor`,(e,t)=>e.colors),new n(`globalAlphaContrastBoost`,e=>e.globalAlphaContrastBoost)).code.add(t`float rgbToLuminance(vec3 color) {
return dot(vec3(0.2126, 0.7152, 0.0722), color);
}
vec4 laserlineOutput(vec4 color) {
float backgroundLuminance = rgbToLuminance(texture(frameColor, uv).rgb);
float alpha = clamp(globalAlpha * max(backgroundLuminance * globalAlphaContrastBoost, 1.0), 0.0, 1.0);
return color * alpha;
}`):u.code.add(t`vec4 laserlineOutput(vec4 color) {
return color * globalAlpha;
}`)}export{c as t};