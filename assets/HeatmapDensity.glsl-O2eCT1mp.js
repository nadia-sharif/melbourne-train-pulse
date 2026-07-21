import{n as e}from"./glsl-D85RBwKC.js";import{n as t}from"./View.glsl-u7L8AmT0.js";import{t as n}from"./FloatPassUniform-DeUP8HjM.js";import{t as r}from"./ShaderBuilder-8uuwgR05.js";function i(i){let a=new r,{vertex:o,fragment:s,attributes:c,varyings:l}=a;t(o,i);let{isAttributeDriven:u,usesHalfFloat:d}=i;return c.add(`position`,`vec3`),c.add(`uv0`,`vec2`),u&&(c.add(`featureAttribute`,`float`),l.add(`attributeValue`,`float`)),d&&s.constants.add(`compressionFactor`,`float`,.25),l.add(`unitCirclePos`,`vec2`),o.uniforms.add(new n(`radius`,({resolutionForScale:e,searchRadius:t},{camera:n,screenToWorldRatio:r,overlayStretch:i})=>2*t*(e===0?1:e/r)*n.pixelRatio/n.fullViewport[2]/i)),o.main.add(e`
    unitCirclePos = uv0;

    vec4 posProj = proj * (view * vec4(${`position`}, 1.0));
    vec4 quadOffset = vec4(unitCirclePos * radius, 0.0, 0.0);

    ${u?e`attributeValue = ${`featureAttribute`};`:``}
    gl_Position = posProj + quadOffset;
  `),s.main.add(e`
    float radiusRatioSquared = dot(unitCirclePos, unitCirclePos);
    if (radiusRatioSquared > 1.0) {
      fragColor = vec4(0.0);
    }
    else {
      float oneMinusRadiusRatioSquared = 1.0 - radiusRatioSquared;
      float density = oneMinusRadiusRatioSquared * oneMinusRadiusRatioSquared ${u?e` * attributeValue`:``} ${d?e` * compressionFactor`:``};
      fragColor = vec4(density);
    }
  `),a}var a=Object.freeze(Object.defineProperty({__proto__:null,build:i},Symbol.toStringTag,{value:`Module`}));export{i as n,a as t};