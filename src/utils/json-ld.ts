/**
 * Serializa datos JSON-LD de forma segura para uso con dangerouslySetInnerHTML.
 *
 * JSON.stringify() no escapa los caracteres < > & por defecto, lo que permite
 * que una cadena como "</script><script>..." rompa el bloque <script> e inyecte
 * JavaScript arbitrario (XSS breakout).
 *
 * Esta función reemplaza esos caracteres por sus equivalentes Unicode, que son
 * válidos en JSON pero seguros dentro de un elemento <script>.
 *
 * Ref: https://owasp.org/www-community/attacks/xss/
 */
export function safeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/'/g, "\\u0027");
}
