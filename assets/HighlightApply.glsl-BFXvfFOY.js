import{n as e}from"./glsl-D85RBwKC.js";import{t}from"./FloatPassUniform-DeUP8HjM.js";import{t as n}from"./HighlightReadBitmap.glsl-gSqhLTwZ.js";import{t as r}from"./IntegerPassUniform-DN8CxRD1.js";import{t as i}from"./Texture2DPassUniform-CiCHIiok.js";import{t as a}from"./ShaderBuilder-8uuwgR05.js";import{t as o}from"./Float2DrawUniform-BbCPIPVz.js";import{t as s}from"./HighlightCellGridScreenSpacePass.glsl-CI6LME6Q.js";import{t as c}from"./Texture2DUintPassUniform-B2S1A2cs.js";import{a as l}from"./HighlightDownsample.glsl-By0_hZfb.js";function u(){let u=new a;u.include(s);let{fragment:d}=u;return d.uniforms.add(new i(`blurInput`,e=>e.highlightBlurTexture),new o(`blurSize`,e=>e.blurSize),new c(`highlightTexture`,e=>e.highlightTexture),new i(`highlightOptionsTexture`,e=>e.highlightOptionsTexture),new r(`highlightLevel`,e=>e.highlightLevel),new t(`occludedIntensityFactor`,e=>e.occludedFactor)),d.constants.add(`inner`,`float`,1-(9-l)/9),u.include(n),d.main.add(e`vec2 highlightTextureSize = vec2(textureSize(highlightTexture,0));
vec2 uv = sUV;
vec2 center = texture(blurInput, uv).rg;
vec2 blurredHighlightValue = (vOutlinePossible == 0.0)
? center
: center * 0.204164
+ texture(blurInput, uv + blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv - blurSize * 1.407333).rg * 0.304005
+ texture(blurInput, uv + blurSize * 3.294215).rg * 0.093913
+ texture(blurInput, uv - blurSize * 3.294215).rg * 0.093913;
float highlightIntensity = blurredHighlightValue.r;
float occlusionWeight = blurredHighlightValue.g;
if (highlightIntensity <= 0.01) {
discard;
}
vec4 fillColor    = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 0), 0);
vec4 outlineColor = texelFetch(highlightOptionsTexture, ivec2(highlightLevel, 1), 0);
uvec2 centerTexel = texelFetch(highlightTexture, ivec2(uv * highlightTextureSize), 0).rg;
uint centerBits = readLevelBits(centerTexel, highlightLevel);
bool centerFilled = (centerBits & 1u) == 1u;
bool centerOccluded = (centerBits & 3u) == 3u;
bool occluded = centerOccluded || (0.5 * highlightIntensity < occlusionWeight);
float occlusionFactor = occluded ? occludedIntensityFactor : 1.0;
float outlineFactor = centerFilled ? 1.0 : smoothstep(0.0, inner, highlightIntensity);
float fillFactor = centerFilled ? 1.0 : 0.0;
vec4 baseColor = mix(outlineColor, fillColor, fillFactor);
float intensity = baseColor.a * occlusionFactor * outlineFactor;
fragColor = vec4(baseColor.rgb, intensity);`),u}var d=Object.freeze(Object.defineProperty({__proto__:null,build:u},Symbol.toStringTag,{value:`Module`}));export{u as n,d as t};