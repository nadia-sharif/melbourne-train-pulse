import{l as e,o as t,s as n}from"./vec4f64-CjgU5APJ.js";import{o as r}from"./vec2f64-IO40D2xB.js";import{t as i}from"./NoParameters-XZJ-8n06.js";import{n as a,t as o}from"./glsl-D85RBwKC.js";import{t as s}from"./Float4PassUniform-Cu2daSgY.js";import{t as c}from"./FloatPassUniform-DeUP8HjM.js";import{t as l}from"./Float4sPassUniform-B1UFJ1Pq.js";import{t as u}from"./FloatsPassUniform-DfJ8EJ1F.js";import{t as d}from"./Float2PassUniform-BYZ61_RB.js";import{t as f}from"./IntegerPassUniform-DN8CxRD1.js";import{t as p}from"./Texture2DPassUniform-CiCHIiok.js";import{t as m}from"./ScreenSpacePass.glsl-9L-_X5OK.js";import{t as h}from"./ShaderBuilder-8uuwgR05.js";import{t as g}from"./CameraSpace.glsl-LQZFWYSr.js";import{n as _,t as v}from"./BlendColorsPremultiplied.glsl-BnH2fynI.js";import"./ShadowCastAccumulate.glsl-CY0N4sbX.js";var y=class extends i{constructor(t){super(),this._data=t,this.sampleScale=r(),this.opacityFromElevation=1,this.gradientColorRamp=S,this.thresholdColor=e(C),this.bandedGradientColorRamp=w,this.bandSize=.1,this.threshold=.5}get shadowCastMap(){return this._data.shadowCastTexture}},b=.7,x=50/255,S=[[0,n(0,0,1,0)],[1,n(0,0,1,b)]],C=n(1,0,0,b),w=[[0,n(x,x,x,0)],[1,n(x,x,x,b)]];function T(e){let t=new h,n=t.fragment;t.include(g),t.include(m);let{rendersSunlight:r,visualization:i}=e;n.constants.add(`inverseSampleValue`,`float`,255),n.uniforms.add(new p(`shadowCastMap`,e=>e.shadowCastMap),new d(`sampleScale`,e=>e.sampleScale),new c(`opacityFromElevation`,e=>e.opacityFromElevation));let y=i===2,b=i===3,x=i===1;b&&n.include(v);let S=!y;switch(S&&n.code.add(a`vec4 evaluateColorRamp(float value) {
if (value <= vvColorValues[0]) {
return vvColorColors[0];
}
for (int i = 1; i < colorRampSize; ++i) {
if (vvColorValues[i] >= value) {
float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
return mix(vvColorColors[i-1], vvColorColors[i], f);
}
}
return vvColorColors[colorRampSize - 1];
}`),i){case 0:n.uniforms.add(new l(`vvColorColors`,8,e=>e.gradientColorRamp.flatMap(([e,t])=>_(E,t))),new f(`colorRampSize`,e=>e.gradientColorRamp.length),new u(`vvColorValues`,8,e=>e.gradientColorRamp.map(([e,t])=>e)));break;case 1:n.uniforms.add(new l(`vvColorColors`,8,e=>e.bandedGradientColorRamp.flatMap(([e,t])=>_(E,t))),new f(`colorRampSize`,e=>e.bandedGradientColorRamp.length),new u(`vvColorValues`,8,e=>e.bandedGradientColorRamp.map(([e,t])=>e)),new c(`bandSize`,e=>e.bandSize));break;case 3:n.uniforms.add(new s(`uColor`,e=>_(E,e.thresholdColor)),new c(`threshold`,e=>e.threshold),new l(`vvColorColors`,8,e=>e.gradientColorRamp.flatMap(([e,t])=>_(E,t))),new f(`colorRampSize`,e=>e.gradientColorRamp.length),new u(`vvColorValues`,8,e=>e.gradientColorRamp.map(([e,t])=>e)));break;case 2:n.uniforms.add(new s(`uColor`,e=>_(E,e.thresholdColor)),new c(`threshold`,e=>e.threshold))}let{type:C,selector:w,thresholdStrengthSelector:T}=b?{type:`vec2`,selector:`rg`,thresholdStrengthSelector:`strength.x`}:{type:`float`,selector:`r`,thresholdStrengthSelector:`strength`},D=!r;return n.main.add(a`
    ${C} numSamples = texture(shadowCastMap, uv).${w} * inverseSampleValue;

    fragColor = vec4(0.0);

    // In shadow space, zero accumulated samples can be skipped when they would render fully transparent.
    // In sunlight space, zero shadow samples may map to full-strength sunlight, so we keep them.
    ${o(D,a`
    if (${o(S,a`vvColorColors[0].a == 0.0 && `,``)}dot(numSamples, ${C}(1)) < 1.0) {
      return;
    }
    `)}

    // sampleScale is the number of total samples taken, so this brings strength to a 0-1 range.
    // note that sampleScale is always a vec2 even if we have only the primary channel.
    ${C} strength = numSamples * sampleScale.${w};

    ${o(r,a`strength = 1.0 - strength;`)}

    // in threshold mode, step the strength to 0 if we are at or below the threshold, 1 otherwise.
    ${o(y||b,a`
      float thresholdStrength = ${T};
      ${T} = 1.0 - step(thresholdStrength, threshold);
    `)}

    // bail out if we are below the threshold
    ${o(y,a`if (${T} == 0.0) { return; }`)}

    ${o(x,a`
      strength = ceil(strength / bandSize) * bandSize;
      `)}

    ${C} attenuation = opacityFromElevation * strength;

    ${o(b,a`
        vec4 thresholdColor = uColor * attenuation.r;
        vec4 gradientColor = evaluateColorRamp(attenuation.g);
        fragColor = blendColorsPremultiplied(${o(r,a`gradientColor, thresholdColor`,a`thresholdColor, gradientColor`)});
      `,o(y,a`
        fragColor = uColor * attenuation;
      `,a`
        fragColor = evaluateColorRamp(attenuation);
      `))}
  `),t}var E=t(),D=Object.freeze(Object.defineProperty({__proto__:null,ShadowCastVisualizePassParameters:y,build:T},Symbol.toStringTag,{value:`Module`}));export{D as n,T as r,y as t};