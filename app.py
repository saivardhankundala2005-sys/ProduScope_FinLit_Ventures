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

# Strip all Streamlit default headers, footers, paddings, and iframe borders
st.markdown("""
<style>
    /* Remove padding around main container */
    .main .block-container {
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
    }
    /* Hide Streamlit header & footer */
    header[data-testid="stHeader"] {
        display: none !important;
    }
    footer {
        display: none !important;
    }
    /* Ensure component iframe takes full width and no border */
    iframe {
        width: 100% !important;
        border: none !important;
    }
    /* Set body background to match app background */
    .stApp {
        background-color: #F2F4F6 !important;
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

    # Inline CSS & JS files
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

        # Remove existing external asset link/script tags to prevent 404s
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
    # Set height to 1100 to give full-height seamless viewing without double scrollbars
    components.html(html_payload, height=1100, scrolling=True)
else:
    st.error("Application build folder `dist/` not found. Please verify repo assets.")
