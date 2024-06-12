const sanitizeHtml = (html = "") => html.replace(/<.*?>/g, "")

export default sanitizeHtml
