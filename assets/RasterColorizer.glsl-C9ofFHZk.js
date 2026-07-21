import{r as e}from"./vec3f64-DIOQknMY.js";import{t}from"./Float3PassUniform-YEiGS05C.js";import{n}from"./glsl-D85RBwKC.js";import{t as r}from"./FloatPassUniform-DeUP8HjM.js";import{t as i}from"./FloatsPassUniform-DfJ8EJ1F.js";import{t as a}from"./ColorConversion.glsl-C9xFjUmo.js";import{t as o}from"./Float2PassUniform-BYZ61_RB.js";import{t as s}from"./IntegerPassUniform-DN8CxRD1.js";import{t as c}from"./Texture2DPassUniform-CiCHIiok.js";import{t as l}from"./ShaderBuilder-8uuwgR05.js";import{n as u,r as d,t as f}from"./TileComposite.glsl-tlMaV8c_.js";import{t as p}from"./BooleanPassUniform-AaK-BoNM.js";function m(e){e.fragment.uniforms.add(new c(`u_colormap`,e=>e.u_colormap),new r(`u_colormapOffset`,e=>e.colormap.u_colormapOffset),new r(`u_colormapMaxIndex`,e=>e.colormap.u_colormapMaxIndex),new r(`u_opacity`,e=>e.common.u_opacity)),e.fragment.code.add(n`vec4 colormap(vec4 currentPixel, bool isFloat) {
float colorIndex = isFloat ? currentPixel.r - u_colormapOffset : currentPixel.r * 255.0 - u_colormapOffset;
vec4 result;
if (currentPixel.a == 0.0 || colorIndex > u_colormapMaxIndex) {
result = vec4(0.0, 0.0, 0.0, 0.0);
} else {
vec2 texelCoordinates = vec2((colorIndex + 0.5), 0.5);
result = texelFetch(u_colormap, ivec2(texelCoordinates), 0);
}
return result;
}`)}function h(e){e.fragment.uniforms.add(new c(`u_transformGrid`,e=>e.u_transformGrid),new o(`u_transformSpacing`,e=>e.common.u_transformSpacing),new o(`u_targetImageSize`,e=>e.common.u_targetImageSize)),e.fragment.code.add(n`vec2 projectPixelLocation(vec2 coords) {
vec2 index_image = floor(coords * u_targetImageSize);
vec2 oneTransformPixel = vec2(4.0, 1.0);
vec2 index_transform = floor(index_image / u_transformSpacing) * oneTransformPixel;
vec2 pos = fract((index_image + 0.5) / u_transformSpacing);
vec2 transform_location = index_transform + 0.5;
vec2 srcLocation;
if (pos.s <= pos.t) {
vec3 ll_abc = texelFetch(u_transformGrid, ivec2(transform_location), 0).rgb;
vec3 ll_def = texelFetch(u_transformGrid, ivec2(transform_location.s + 1.0, transform_location.t), 0).rgb;
srcLocation.s = dot(ll_abc, vec3(pos, 1.0));
srcLocation.t = dot(ll_def, vec3(pos, 1.0));
} else {
vec3 ur_abc = texelFetch(u_transformGrid, ivec2(transform_location.s + 2.0, transform_location.t), 0).rgb;
vec3 ur_def = texelFetch(u_transformGrid, ivec2(transform_location.s + 3.0, transform_location.t), 0).rgb;
srcLocation.s = dot(ur_abc, vec3(pos, 1.0));
srcLocation.t = dot(ur_def, vec3(pos, 1.0));
}
return srcLocation;
}`)}var g=class extends f{constructor(e,t,n){super(),this.common=e,this.u_image=t,this.u_transformGrid=n}};function _(e,t){e.include(h),e.fragment.uniforms.add(new c(`u_image`,e=>e.u_image),new p(`u_flipY`,e=>e.common.u_flipY),new p(`u_applyTransform`,e=>e.common.u_applyTransform));let{requireBilinearWithNN:r}=t;r&&e.fragment.uniforms.add(new o(`u_srcImageSize`,e=>e.common.u_srcImageSize)),e.fragment.code.add(n`vec2 getPixelLocation(vec2 coords) {
vec2 targetLocation = u_flipY ? vec2(coords.s, 1.0 - coords.t) : coords;
if (!u_applyTransform) {
return targetLocation;
}
return projectPixelLocation(targetLocation);
}
bool isOutside(vec2 coords){
if (coords.t>1.00001 ||coords.t<-0.00001 || coords.s>1.00001 ||coords.s<-0.00001) {
return true;
} else {
return false;
}
}`),r?e.fragment.code.add(n`vec4 sampleBilinear(sampler2D sampler, vec2 coords, vec2 texSize) {
vec2 texelStart = floor(coords * texSize);
vec2 coord0 = texelStart / texSize;
vec2 coord1 = (texelStart +  vec2(1.0, 0.0)) / texSize;
vec2 coord2 = (texelStart +  vec2(0.0, 1.0)) / texSize;
vec2 coord3 = (texelStart +  vec2(1.0, 1.0)) / texSize;
vec4 color0 = texture(sampler, coord0);
vec4 color1 = texture(sampler, coord1);
vec4 color2 = texture(sampler, coord2);
vec4 color3 = texture(sampler, coord3);
vec2 blend = fract(coords * texSize);
vec4 color01 = mix(color0, color1, blend.x);
vec4 color23 = mix(color2, color3, blend.x);
vec4 color = mix(color01, color23, blend.y);
float alpha = floor(color0.a * color1.a * color2.a * color3.a + 0.5);
color = color * alpha + (1.0 - alpha) * texture(sampler, coords);
return color;
}
vec4 getPixel(vec2 pixelLocation) {
return sampleBilinear(u_image, pixelLocation, u_srcImageSize);
}`):e.fragment.code.add(n`vec4 getPixel(vec2 pixelLocation) {
return texture(u_image, pixelLocation);
}`)}var v=class extends g{constructor(t,n,r,i,a,o){super(t,i,a),this.colormap=n,this.symbolizer=r,this.u_colormap=o,this.backgroundColor=e,this.fboTexture=null,this.baseOpacity=1}},y=class extends v{},b=class extends v{};function x(e){let t=new l;return t.include(u),t.include(_,e),t.include(m,e),t.include(d,e),t.fragment.code.add(n`vec4 applyBackgroundBlend(vec4 layerColor) {
return blendLayers(vuv, layerColor, u_opacity);
}`),e.colorizerType===0?C(t,e):e.colorizerType===1?S(t):e.colorizerType===2&&w(t,e),t}function S(e){e.fragment.main.add(n`vec2 pixelLocation = getPixelLocation(uv);
if (isOutside(pixelLocation)) {
fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
return;
}
vec4 currentPixel = getPixel(pixelLocation);
fragColor = applyBackgroundBlend(colormap(currentPixel, true));`)}function C(e,i){e.fragment.uniforms.add(new s(`u_bandCount`,e=>e.symbolizer.u_bandCount),new t(`u_minCutOff`,e=>e.symbolizer.u_minCutOff),new t(`u_maxCutOff`,e=>e.symbolizer.u_maxCutOff),new t(`u_factor`,e=>e.symbolizer.u_factor),new r(`u_minOutput`,e=>e.symbolizer.u_minOutput),new r(`u_maxOutput`,e=>e.symbolizer.u_maxOutput),new p(`u_useGamma`,e=>e.symbolizer.u_useGamma),new t(`u_gamma`,e=>e.symbolizer.u_gamma),new t(`u_gammaCorrection`,e=>e.symbolizer.u_gammaCorrection),new r(`u_opacity`,e=>e.common.u_opacity)),e.fragment.code.add(n`float stretchOneValue(float val, float minCutOff, float maxCutOff, float minOutput, float maxOutput, float factor, bool useGamma, float gamma, float gammaCorrection) {
if (val >= maxCutOff) {
return maxOutput;
} else if (val <= minCutOff) {
return minOutput;
}
float stretchedVal;
if (useGamma) {
float tempf = 1.0;
float outRange = maxOutput - minOutput;
float relativeVal = (val - minCutOff) / (maxCutOff - minCutOff);
if (gamma > 1.0) {
tempf -= pow(1.0 / outRange, relativeVal * gammaCorrection);
}
stretchedVal = (tempf * outRange * pow(relativeVal, 1.0 / gamma) + minOutput) / 255.0;
} else {
stretchedVal = minOutput + (val - minCutOff) * factor;
}
return stretchedVal;
}`);let a=i.applyColormap?n`fragColor = applyBackgroundBlend(colormap(vec4(grayVal, grayVal, grayVal, currentPixel.a), !u_useGamma));`:n`fragColor = applyBackgroundBlend(vec4(grayVal, grayVal, grayVal, currentPixel.a));`;e.fragment.main.add(n`
    vec2 pixelLocation = getPixelLocation(uv);
    if (isOutside(pixelLocation)) {
      fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
      return;
    }

    vec4 currentPixel = getPixel(pixelLocation);
    ${i.stretchType===0?n`fragColor = applyBackgroundBlend(currentPixel);`:n`
    if (currentPixel.a == 0.0) {
      fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
      return;
    }
    if (u_bandCount == 1) {
      float grayVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
      ${a}
    } else {
      float redVal = stretchOneValue(currentPixel.r, u_minCutOff[0], u_maxCutOff[0], u_minOutput, u_maxOutput, u_factor[0], u_useGamma, u_gamma[0], u_gammaCorrection[0]);
      float greenVal = stretchOneValue(currentPixel.g, u_minCutOff[1], u_maxCutOff[1], u_minOutput, u_maxOutput, u_factor[1], u_useGamma, u_gamma[1], u_gammaCorrection[1]);
      float blueVal = stretchOneValue(currentPixel.b, u_minCutOff[2], u_maxCutOff[2], u_minOutput, u_maxOutput, u_factor[2], u_useGamma, u_gamma[2], u_gammaCorrection[2]);
      fragColor = applyBackgroundBlend(vec4(redVal, greenVal, blueVal, currentPixel.a));
    }`}`)}function w(e,t){let l=e.fragment;l.uniforms.add(new c(`u_image`,e=>e.u_image),new s(`u_hillshadeType`,e=>e.symbolizer.u_hillshadeType),new i(`u_sinZcosAs`,6,e=>e.symbolizer.u_sinZcosAs),new i(`u_sinZsinAs`,6,e=>e.symbolizer.u_sinZsinAs),new i(`u_cosZs`,6,e=>e.symbolizer.u_cosZs),new i(`u_weights`,6,e=>e.symbolizer.u_weights),new o(`u_factor`,e=>e.symbolizer.u_factor),new r(`u_minValue`,e=>e.symbolizer.u_minValue),new r(`u_maxValue`,e=>e.symbolizer.u_maxValue),new o(`u_srcImageSize`,e=>e.common.u_srcImageSize)),l.include(a),l.code.add(n`vec4 overlay(float val, float minValue, float maxValue, float hillshade, float alpha) {
val = clamp((val - minValue) / (maxValue - minValue), 0.0, 1.0);
vec4 color = colormap(vec4(val, val, val, 1.0), false);
vec3 hsv = rgb2hsv(color.rgb);
hsv.z = hillshade;
return vec4(hsv2rgb(hsv), 1.0) * alpha * color.a;
}`),l.code.add(n`float getNeighborHoodAlpha(float a, float b, float c, float d, float e, float f, float g, float h, float i){
if (a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0 || a == 0.0 || a == 0.0 || a==0.0) {
return 0.0;
}  else {
return e;
}
}`);let u=t.applyColormap?n`fragColor = applyBackgroundBlend(overlay(ve.r, u_minValue, u_maxValue, hillshade, alpha));`:n`hillshade *= alpha;
fragColor = applyBackgroundBlend(vec4(hillshade, hillshade, hillshade, alpha));`;l.main.add(n`
      vec2 pixelLocation = getPixelLocation(uv);
      if (isOutside(pixelLocation)) {
        fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
        return;
      }

      vec4 currentPixel = getPixel(pixelLocation);
      if (currentPixel.a == 0.0) {
        fragColor = applyBackgroundBlend(vec4(0.0, 0.0, 0.0, 0.0));
        return;
      }

      //mirror edge pixels
      vec2 axy = vec2(-1.0, -1.0);
      vec2 bxy = vec2(0.0, -1.0);
      vec2 cxy = vec2(1.0, -1.0);
      vec2 dxy = vec2(-1.0, 0.0);
      vec2 fxy = vec2(1.0, 0.0);
      vec2 gxy = vec2(-1.0, 1.0);
      vec2 hxy = vec2(0.0, 1.0);
      vec2 ixy = vec2(1.0, 1.0);
      vec2 onePixel = 1.0 / u_srcImageSize;
      if (pixelLocation.s < onePixel.s) {
        axy[0] = 1.0;
        dxy[0] = 1.0;
        gxy[0] = 1.0;
      }
      if (pixelLocation.t < onePixel.t) {
        axy[1] = 1.0;
        bxy[1] = 1.0;
        cxy[1] = 1.0;
      }
      if (pixelLocation.s > 1.0 - onePixel.s) {
        cxy[0] = -1.0;
        fxy[0] = -1.0;
        ixy[0] = -1.0;
      }
      if (pixelLocation.t > 1.0 - onePixel.t) {
        gxy[1] = -1.0;
        hxy[1] = -1.0;
        ixy[1] = -1.0;
      }

      // calculate hillshade
      vec4 va = texture(u_image, pixelLocation + onePixel * axy);
      vec4 vb = texture(u_image, pixelLocation + onePixel * bxy);
      vec4 vc = texture(u_image, pixelLocation + onePixel * cxy);
      vec4 vd = texture(u_image, pixelLocation + onePixel * dxy);
      vec4 ve = texture(u_image, pixelLocation);
      vec4 vf = texture(u_image, pixelLocation + onePixel * fxy);
      vec4 vg = texture(u_image, pixelLocation + onePixel * gxy);
      vec4 vh = texture(u_image, pixelLocation + onePixel * hxy);
      vec4 vi = texture(u_image, pixelLocation + onePixel * ixy);

      // calculate the rate of z change along the x, y, and diagonal direction
      float dzx = (vc + 2.0 * vf + vi - va - 2.0 * vd - vg).r * u_factor.s;
      float dzy = (vg + 2.0 * vh + vi - va - 2.0 * vb - vc).r * u_factor.t;
      float dzd = sqrt(1.0 + dzx * dzx + dzy * dzy);
      float hillshade = 0.0;

      // traditional single light source
      if (u_hillshadeType == 0){
        float cosDelta = u_sinZsinAs[0] * dzy - u_sinZcosAs[0] * dzx;
        float z = (u_cosZs[0] + cosDelta) / dzd;
        if (z < 0.0)  z = 0.0;
        hillshade = z;
      } else {
        // multi-directional with 6 light sources
        for (int k = 0; k < 6; k++) {
        float cosDelta = u_sinZsinAs[k] * dzy - u_sinZcosAs[k] * dzx;
        float z = (u_cosZs[k] + cosDelta) / dzd;
        if (z < 0.0) z = 0.0;
        hillshade = hillshade + z * u_weights[k];
        if (k == 5) break;
        }
      }

      // set color
      float alpha = getNeighborHoodAlpha(va.a, vb.a, vc.a, vd.a, ve.a, vf.a, vg.a, vh.a, vi.a);
      alpha *= u_opacity;
      ${u}`)}var T=Object.freeze(Object.defineProperty({__proto__:null,ColorizerHillshadeUniforms:b,ColorizerStretchUniforms:y,ColorizerUniforms:v,build:x},Symbol.toStringTag,{value:`Module`}));export{x as a,T as i,v as n,y as r,b as t};