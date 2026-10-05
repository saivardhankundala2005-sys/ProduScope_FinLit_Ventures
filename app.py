import streamlit as st
import streamlit.components.v1 as components
import os
import re

st.set_page_config(
    page_title="SIP Pause Co-pilot",
    page_icon="💡",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to eliminate Streamlit padding
st.markdown("""
<style>
    .main .block-container {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        max-width: 100%;
    }
    header[data-testid="stHeader"] {
        display: none;
    }
    footer {
        display: none;
    }
</style>
""", unsafe_allow_html=True)

base_dir = os.path.dirname(os.path.abspath(__file__))
dist_index = os.path.join(base_dir, "dist", "index.html")
assets_dir = os.path.join(base_dir, "dist", "assets")

def get_bundled_html():
    if not os.path.exists(dist_index):
        return None

    with open(dist_index, "r", encoding="utf-8") as f:
        html = f.read()

    # Inline CSS files
    if os.path.exists(assets_dir):
        css_blocks = []
        js_blocks = []

        for fname in os.listdir(assets_dir):
            fpath = os.path.join(assets_dir, fname)
            if fname.endswith(".css"):
                with open(fpath, "r", encoding="utf-8") as css_f:
                    css_blocks.append(css_f.read())
            elif fname.endswith(".js"):
                with open(fpath, "r", encoding="utf-8") as js_f:
                    js_blocks.append(js_f.read())

        # Strip existing external link and script tags to avoid 404s
        html = re.sub(r'<link[^>]*href=["\']/assets/[^"\']*["\'][^>]*>', '', html)
        html = re.sub(r'<script[^>]*src=["\']/assets/[^"\']*["\'][^>]*></script>', '', html)

        # Inject inlined CSS into head
        if css_blocks:
            combined_css = "<style>\n" + "\n".join(css_blocks) + "\n</style>\n"
            html = html.replace("</head>", f"{combined_css}</head>")

        # Inject inlined JS into body
        if js_blocks:
            combined_js = "<script type=\"module\">\n" + "\n".join(js_blocks) + "\n</script>\n"
            html = html.replace("</body>", f"{combined_js}</body>")

    return html

html_payload = get_bundled_html()

if html_payload:
    components.html(html_payload, height=920, scrolling=True)
else:
    st.error("Application build folder `dist/` not found. Please verify repo assets.")
