import{c as e}from"./vec3f64-DIOQknMY.js";import{p as t,y as n}from"./vec3-C5q_s_3T.js";import{n as r}from"./glsl-D85RBwKC.js";import{t as i}from"./Float3BindUniform-BmdF9XGj.js";import{t as a}from"./Float4PassUniform-Cu2daSgY.js";import{t as o}from"./FloatPassUniform-DeUP8HjM.js";import{t as s}from"./Texture2DBindUniform-4_yYNByJ.js";import{t as c}from"./ReadDepth.glsl-Ca_0z8Pl.js";import{t as l}from"./ScreenSpacePass.glsl-9L-_X5OK.js";import{t as u}from"./ShaderBuilder-8uuwgR05.js";import{t as d}from"./CameraSpace.glsl-LQZFWYSr.js";import{n as f,t as p}from"./Texture2DShadowBindUniform-K3x5AtUd.js";import{t as m}from"./Texture2DUintPassUniform-B2S1A2cs.js";import{t as h}from"./calculateUVZShadowFromDepth.glsl-BB3WDROO.js";function g(e){let t=e.fragment;e.include(d),t.include(c),t.code.add(r`vec3 normalFromDepth(sampler2D depthMap, vec3 pixelPos, vec2 fragCoord, vec2 uv) {
ivec2 iuv = ivec2(uv * vec2(textureSize(depthMap, 0)));
float leftPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(-1, 0), 0).r);
float rightPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(1, 0), 0).r);
float bottomPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(0, -1), 0).r);
float topPixelDepth = linearizeDepth(texelFetch(depthMap, iuv + ivec2(0, 1), 0).r);
bool pickLeft = abs(pixelPos.z - leftPixelDepth) < abs(pixelPos.z - rightPixelDepth);
bool pickBottom = abs(pixelPos.z - bottomPixelDepth) < abs(pixelPos.z - topPixelDepth);
vec3 fragCoordHorizontal = pickLeft
? vec3(fragCoord + vec2(-1.0, 0.0), leftPixelDepth)
: vec3(fragCoord + vec2(1.0, 0.0), rightPixelDepth);
vec3 fragCoordVertical = pickBottom
? vec3(fragCoord + vec2(0.0, -1.0), bottomPixelDepth)
: vec3(fragCoord + vec2(0.0, 1.0), topPixelDepth);
vec3 verticalPixelPos = reconstructPosition(fragCoordHorizontal.xy, fragCoordHorizontal.z);
vec3 horizontalPixelPos = reconstructPosition(fragCoordVertical.xy, fragCoordVertical.z);
vec3 normal = normalize(cross(verticalPixelPos - pixelPos, horizontalPixelPos - pixelPos));
return pickLeft == pickBottom ? normal : -normal;
}`)}var _=.025;function v(e){let c=new u;c.include(h),c.fragment.include(f),c.include(l),c.include(g);let d=c.fragment;return d.uniforms.add(new p(`shadowMapExcludingHighlight`,({shadowMap:e})=>e.getOutput(7)),new s(`shadowHighlight`,({shadowHighlight:e})=>e?.getTexture()),new s(`depthMap`,e=>e.mainDepth),new m(`highlightTexture`,e=>e.highlightTexture),new a(`uColor`,e=>e.shadowColor),new o(`opacity`,e=>e.shadowOpacity),new o(`occludedOpacity`,e=>e.occludedShadowOpacity),new o(`terminationFactor`,e=>e.opacityElevation*e.dayNightTerminator),new i(`lightingMainDirectionView`,({lighting:e,camera:r})=>n(y,t(y,e.mainLight.direction,r.viewInverseTransposeMatrix)))),d.main.add(r`
    ivec2 highlightTextureSize = textureSize(highlightTexture, 0);
    ivec2 highlightIUV = ivec2(uv * vec2(highlightTextureSize));
    uvec2 highlightInfo = texelFetch(highlightTexture, highlightIUV, 0).rg;

    fragColor = vec4(0.0);

    // Calculate bit mask to check if pixel is highlit unoccluded at any level
    uint ored = (highlightInfo.r << 0) | (highlightInfo.g << 8);

    bool visiblyHighlighted = ((ored & ~(ored >> 1)) & (1u+4u+16u+64u)) != 0u;
    if (visiblyHighlighted) {
      return;
    }

    // shadowHighlight is rendered as a full-resolution screen-space buffer, so the current
    // framebuffer pixel maps directly to the corresponding texel in the screen-space highlight texture.
    float shadowHighlightFactor = texelFetch(shadowHighlight, ivec2(gl_FragCoord.xy), 0).r;
    if (shadowHighlightFactor == 0.0) {
      return;
    }

    vec4 currentPixelPos;
    vec3 uvzShadow = calculateUVZShadowAndPixelPosFromDepth(
      uv,
      textureSize(shadowMapExcludingHighlight, 0),
      depthMap,
      currentPixelPos
    );
    if (uvzShadow.z < 0.0) {
      return;
    }

    float shadowExcludingHighlightFactor = readShadowMapUVZ(uvzShadow, shadowMapExcludingHighlight);

    vec3 normal = normalFromDepth(depthMap, currentPixelPos.xyz, gl_FragCoord.xy, uv);
    bool shaded = dot(normal, lightingMainDirectionView) < ${r.float(_)};

    float occludedFactor = max(shadowExcludingHighlightFactor, shaded ? 1.0 : 0.0);
    float fragOpacity = mix(opacity, occludedOpacity, occludedFactor);
    fragColor = vec4(uColor.rgb, uColor.a * fragOpacity * terminationFactor);
  `),c}var y=e(),b=Object.freeze(Object.defineProperty({__proto__:null,build:v},Symbol.toStringTag,{value:`Module`}));export{b as n,v as t};