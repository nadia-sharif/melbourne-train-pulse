import{j as e}from"./arrayUtils-DXfY1bBO.js";import{E as t}from"./mathUtils-D79yUFwW.js";import{o as n}from"./vec2f64-IO40D2xB.js";import{t as r}from"./NoParameters-XZJ-8n06.js";import{n as i,t as a}from"./glsl-D85RBwKC.js";import{t as o}from"./FloatPassUniform-DeUP8HjM.js";import{t as s}from"./Float2PassUniform-BYZ61_RB.js";import{t as c}from"./Texture2DPassUniform-CiCHIiok.js";import{t as l}from"./ScreenSpacePass.glsl-9L-_X5OK.js";import{t as u}from"./ShaderBuilder-8uuwgR05.js";import{t as d}from"./Gamma.glsl-BiRghhbe.js";var f=class extends r{constructor(){super(...arguments),this.blurRadius=0,this.level=0,this.inputScale=1,this.size=n()}};function p({glowStage:n,useFloatBlend:r}){let f=new u,p=f.fragment;f.include(l),p.include(d);let m=n===0;p.uniforms.add(new c(`colorTexture`,e=>e.input),new o(`blurRadius`,({blurRadius:e})=>e),new o(`level`,({level:e})=>e),new o(`inputScale`,({inputScale:e})=>r?1:e),new s(`size`,({size:e})=>e));let h=`float locations1D[7] = float[7](`;for(let e=0;e<7;e++)h+=`${e===0?``:`,`} ${(e/6*2-1).toFixed(15)}`;h+=`);`;let g=Array(7).fill(0).map((e,n)=>t(n-3,2));e(g);let _=g.reduce((e,t,n)=>`${e}${n===0?``:`,`} ${t.toFixed(15)}`,`float locations1DWeights[7] = float[7](`)+`);`;return p.code.add(i`
    ${h}
    ${_}

    vec3 blurUniformSamples() {
      int textureLevel = int(${m?`level`:`0.0`});
      vec2 aspectCorrection = vec2(1.0, size.x / size.y);

      ${a(m,`float viewportScale = 1.0;`,`float viewportScale = 1.0 / pow(2.0, level);`)}
      vec2 uv = uv * viewportScale;
      vec2 pixelCenterShift = 0.5 / size;

      vec3 res = vec3(0.0);
      for(int i = 0; i < ${i.int(7)}; ++i) {
        float uv1D = locations1D[i] * viewportScale + ${m?`pixelCenterShift.x`:`pixelCenterShift.y`};
        vec2 uvOffset = ${m?`vec2(uv1D, 0.0)`:`vec2(0.0, uv1D)`};
        vec2 uvDistorted = uv + uvOffset * blurRadius * aspectCorrection;
        vec3 sampleColor = texture(colorTexture, uvDistorted, -1.0).rgb * inputScale;
        res += sampleColor * locations1DWeights[i];
      }
      return res;
    }
  `).main.add(i`fragColor = vec4(blurUniformSamples(), 0.0);`),f}var m=Object.freeze(Object.defineProperty({__proto__:null,GlowBlurPassParameters:f,build:p},Symbol.toStringTag,{value:`Module`}));export{p as n,m as r,f as t};