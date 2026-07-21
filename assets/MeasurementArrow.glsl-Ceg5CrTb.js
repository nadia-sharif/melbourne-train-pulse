import{n as e}from"./glsl-D85RBwKC.js";import{n as t}from"./View.glsl-u7L8AmT0.js";import{t as n}from"./Float4PassUniform-Cu2daSgY.js";import{t as r}from"./FloatPassUniform-DeUP8HjM.js";import{t as i}from"./ShaderBuilder-8uuwgR05.js";import{t as a}from"./OutputColorHighlightOLID.glsl-CzPahQyj.js";function o(o){let s=new i,{vertex:c,fragment:l}=s;s.include(a,o),t(c,o),c.uniforms.add(new r(`width`,e=>e.width)),s.attributes.add(`position`,`vec3`),s.attributes.add(`normal`,`vec3`),s.attributes.add(`uv0`,`vec2`),s.attributes.add(`length`,`float`),s.varyings.add(`vtc`,`vec2`),s.varyings.add(`vlength`,`float`),s.varyings.add(`vradius`,`float`),c.main.add(e`vec3 bitangent = normal;
vtc = uv0;
vlength = length;
vradius = 0.5 * width;
vec4 pos = view * vec4(position + vradius * bitangent * uv0.y, 1.0);
gl_Position = proj * pos;`),l.uniforms.add(new r(`outlineSize`,e=>e.outlineSize),new n(`outlineColor`,e=>e.outlineColor),new r(`stripeLength`,e=>e.stripeLength),new n(`stripeEvenColor`,e=>e.stripeEvenColor),new n(`stripeOddColor`,e=>e.stripeOddColor));let u=1/Math.sqrt(2);return l.code.add(e`
    const float INV_SQRT2 = ${e.float(u)};

    vec4 arrowColor(vec2 tc, float len) {
      float d = INV_SQRT2 * (tc.x - abs(tc.y));
      d = min(d, INV_SQRT2 * (len - tc.x - abs(tc.y)));
      d = min(d, 1.0 - abs(tc.y));

      if (d < 0.0) {
        return vec4(0.0);
      }
      if (d < outlineSize) {
        return outlineColor;
      }
      return fract(0.5 / stripeLength * tc.x * vradius) >= 0.5 ? stripeOddColor : stripeEvenColor;
    }`),l.main.add(e`vec2 ntc = vec2(vtc.x / vradius, vtc.y);
vec4 color = arrowColor(ntc, vlength / vradius);
outputColorHighlightOLID(color, color.rgb);`),s}var s=Object.freeze(Object.defineProperty({__proto__:null,build:o},Symbol.toStringTag,{value:`Module`}));export{s as n,o as t};