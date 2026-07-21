import{n as e,t}from"./glsl-D85RBwKC.js";import{n}from"./View.glsl-u7L8AmT0.js";import{t as r}from"./Float4PassUniform-Cu2daSgY.js";import{t as i}from"./FloatPassUniform-DeUP8HjM.js";import{t as a}from"./ColorConversion.glsl-C9xFjUmo.js";import{t as o}from"./ShaderBuilder-8uuwgR05.js";import{t as s}from"./alphaCutoff.glsl-WbW_sSK3.js";import{t as c}from"./OutputColorHighlightOLID.glsl-CzPahQyj.js";function l(l){let u=new o,{vertex:d,fragment:f,attributes:p,varyings:m}=u;return n(d,l),u.include(c,l),f.include(s),f.include(a),p.add(`position`,`vec3`),p.add(`uv0`,`vec2`),m.add(`vUV`,`vec2`),d.main.add(e`vUV = uv0;
gl_Position = proj * view * vec4(position, 1.0);`),f.uniforms.add(new r(`backgroundColor`,e=>e.backgroundColor),new r(`gridColor`,e=>e.gridColor),new i(`gridWidth`,e=>e.gridWidth)).main.add(e`
    const float LINE_WIDTH = 1.0;

    vec2 uvScaled = vUV * gridWidth;
    vec2 gridUV = (fract(uvScaled + 0.5) - 0.5) / (LINE_WIDTH * fwidth(uvScaled));
    vec2 grid = (1.0 - step(0.5, gridUV)) * step(-0.5, gridUV);

    // mask aliasing along edges
    grid.x *= step(0.5, uvScaled.x) * step(uvScaled.x, gridWidth - 0.5);
    grid.y *= step(0.5, uvScaled.y) * step(uvScaled.y, gridWidth - 0.5);

    float gridFade = max(grid.x, grid.y);
    float gridAlpha = gridColor.a * gridFade;

    // premultiply alpha in output
    vec4 finalColor =
      premultiplyAlpha(backgroundColor) * (1.0 - gridAlpha) +
      premultiplyAlpha(vec4(gridColor.rgb, gridAlpha));
    ${t(l.emissionDimmingPass,`if (finalColor.a > alphaCutoff) { finalColor.rgb /= finalColor.a; }`)}
    outputColorHighlightOLID(finalColor, finalColor.rgb);`),u}var u=Object.freeze(Object.defineProperty({__proto__:null,build:l},Symbol.toStringTag,{value:`Module`}));export{l as n,u as t};