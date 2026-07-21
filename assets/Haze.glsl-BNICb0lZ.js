import{n as e,t}from"./glsl-D85RBwKC.js";import{t as n}from"./FloatPassUniform-DeUP8HjM.js";import{t as r}from"./Texture2DBindUniform-4_yYNByJ.js";import{t as i}from"./ReadDepth.glsl-Ca_0z8Pl.js";import{t as a}from"./FloatsPassUniform-DfJ8EJ1F.js";import{t as o}from"./ShaderBuilder-8uuwgR05.js";import{t as s}from"./Gamma.glsl-BiRghhbe.js";import{r as c}from"./MainLighting.glsl-BzpgU6pB.js";import{t as l}from"./ToneMapping.glsl-BO4QToFy.js";import{t as u}from"./SphereIntersect.glsl-DoZEFl8k.js";import{n as d,t as f}from"./ChapmanRaymarching.glsl-QsDFqvFt.js";import{t as p}from"./ScreenSpacePassAtmosphere.glsl-BUOp4Xvv.js";function m(m){let h=new o,{fragment:g}=h;h.include(p),c(g),g.include(s),g.include(i),g.include(u),g.include(l),g.include(f,!0),g.uniforms.add(new r(`depthTexture`,e=>e.mainDepth));let{reduced:_}=m;return _&&g.code.add(e`float getDepth(vec2 uv){
return linearDepthFromTexture(depthTexture, uv);
}
float textureBilinear(vec2 uv) {
vec2 depthTextureSize = vec2(textureSize(depthTexture, 0));
vec2 texelSize = 1.0 / depthTextureSize;
vec2 depthUV = (uv * depthTextureSize) - vec2(0.5);
vec2 f = fract(depthUV);
vec2 snapUV = (floor(depthUV) + vec2(0.5)) / depthTextureSize;
float d0 = getDepth(snapUV);
float d1 = getDepth(snapUV + vec2(texelSize.x, 0.0));
float d2 = getDepth(snapUV + vec2(0.0, texelSize.y));
float d3 = getDepth(snapUV + texelSize);
return mix(mix(d0, d1, f.x), mix(d2, d3, f.x), f.y);
}`),g.uniforms.add(new n(`hazeStrength`,e=>e.hazeStrength),new a(`heightParameters`,5,(e,t)=>d(t,e))).main.add(e`
    float depthSample = depthFromTexture(depthTexture, uv);
    if (depthSample == 1.0) {
      discard;
    }

    vec3 rayDir = normalize(worldRay);
    vec3 cameraSpaceRay = normalize(eyeDir);
    cameraSpaceRay /= cameraSpaceRay.z;

    cameraSpaceRay *= ${t(_,`-textureBilinear(uv)`,`-linearizeDepth(depthSample)`)};
    float terrainDepth = max(0.0, length(cameraSpaceRay));

    // Alpha is ignored for haze blending
    float fadeOut = smoothstep(-10000.0, -15000.0, heightParameters[0] - radii[0]);
    vec3 color = (1.0 - fadeOut) * hazeStrength * raymarchAtmosphere(rayDir, mainLightDirection, terrainDepth);

    color = tonemapACES(color);
    fragColor = delinearizeGamma(vec4(color, 1.0));
  `),h}var h=Object.freeze(Object.defineProperty({__proto__:null,build:m},Symbol.toStringTag,{value:`Module`}));export{m as n,h as t};