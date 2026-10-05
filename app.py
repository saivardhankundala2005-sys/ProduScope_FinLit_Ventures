import streamlit as st
import streamlit.components.v1 as components
import os
import json
import subprocess

st.set_page_config(
    page_title="SIP Pause Co-pilot",
    page_icon="💡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for Streamlit container
st.markdown("""
<style>
    .main .block-container {
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        max-width: 100%;
    }
    header[data-testid="stHeader"] {
        background: transparent;
    }
</style>
""", unsafe_allow_html=True)

# Base directory setup
base_dir = os.path.dirname(os.path.abspath(__file__))
dist_index = os.path.join(base_dir, "dist", "index.html")
public_data_dir = os.path.join(base_dir, "public", "data")

# Check if public/data exists; if not, run build_data.py
if not os.path.exists(os.path.join(public_data_dir, "funds.json")):
    st.info("Generating precomputed JSON datasets from raw parquet...")
    try:
        subprocess.run(["python", os.path.join(base_dir, "scripts", "build_data.py")], check=True)
    except Exception as e:
        st.warning(f"Could not build data via script: {e}")

# Check if dist/index.html exists; if not, run build
if not os.path.exists(dist_index):
    st.info("Building static Vite web application bundle...")
    try:
        subprocess.run(["npm", "run", "build"], check=True)
    except Exception as e:
        st.warning(f"Build command failed or npm unavailable: {e}")

# Render full interactive web app component
if os.path.exists(dist_index):
    with open(dist_index, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Fix relative asset links for Streamlit iframe serving if needed
    assets_dir = os.path.join(base_dir, "dist", "assets")
    if os.path.exists(assets_dir):
        for fname in os.listdir(assets_dir):
            fpath = os.path.join(assets_dir, fname)
            if fname.endswith(".css"):
                with open(fpath, "r", encoding="utf-8") as css_f:
                    css_code = css_f.read()
                html_content = html_content.replace(f'href="/assets/{fname}"', f'href="assets/{fname}"')
                html_content = f"<style>{css_code}</style>\n" + html_content
            elif fname.endswith(".js"):
                with open(fpath, "r", encoding="utf-8") as js_f:
                    js_code = js_f.read()
                html_content = html_content.replace(f'src="/assets/{fname}"', f'src="assets/{fname}"')
                html_content = html_content + f"\n<script>{js_code}</script>\n"

    # Embed in Streamlit Component
    components.html(html_content, height=920, scrolling=True)
else:
    st.title("SIP Pause Co-pilot (ProduScope 2026)")
    st.markdown("### Independent Decision Check for Mutual Fund SIPs")
    st.warning("Please build the web app using `npm run build` or run `npm run dev` for local development.")
