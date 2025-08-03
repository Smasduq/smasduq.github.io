from flask import Flask, render_template, request, redirect
import requests
import os
from dotenv import load_dotenv
import smtplib
from email.message import EmailMessage

load_dotenv()
app = Flask(__name__)


PAYSTACK_SECRET_KEY = os.getenv("PAYSTACK_SECRET_KEY")

def send_email_to_user(to_email, amount):
    EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
    EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

    msg = EmailMessage()
    msg['Subject'] = "Payment Successful"
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg.set_content(f"Thank you for supporting me with ₦{amount / 100}, Wish you the best. And I'll try my best to see I get more clips for you guys.")

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/support')
def support():
    return render_template('support.html')

@app.route('/download')
def download():
    return render_template('download.html')

@app.route('/manga-redirect')
def manga_redirect():
    return render_template('manga.html')

@app.route('/download/manga')
def manga():
    return render_template('manga-1.html')

@app.route('/anime-redirect')
def anime_redirect():
    return render_template('anime.html')

@app.route('/download/anime')
def anime():
    return render_template('anime-1.html')

@app.route('/cars-redirect')
def cars_redirect():
    return render_template('cars.html')

@app.route('/download/cars')
def cars():
    return render_template('cars-1.html')

@app.route('/football-redirect')
def football_redirect():
    return render_template('football.html')

@app.route('/download/football')
def football():
    return render_template('football-1.html')

@app.route('/download/xml-redirect')
def xml_redirect():
    return render_template('xml.html')

@app.route('/donload/xml')
def xml():
    return render_template('xml-1.html')

@app.route('/pay-form')
def pay_form():
    return render_template('pay.html')


@app.route("/pay", methods=["POST"])
def pay():
    email = request.form["email"]
    amount = int(request.form["amount"]) * 100  # Convert to kobo
    name = request.form["name"]

    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "email": email,
        "amount": amount,
        "metadata": {
            "custom_fields": [
                {
                    "display_name": "Customer Full name",
                    "variable_name": "customer_full_name",
                    "value": name,
                }
            ]
        },
        "callback_url": "http://smasduq.onrender.com/payment-complete"
    }

    response = requests.post("https://api.paystack.co/transaction/initialize", json=data, headers=headers)
    res = response.json()

    if res.get("status"):
        return redirect(res["data"]["authorization_url"])
    else:
        return "Payment failed. Please try again."

@app.route("/payment-complete")
def payment_complete():
    reference = request.args.get("reference")
    if not reference:
        return "No reference provided", 400

    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}"
    }

    response = requests.get(f"https://api.paystack.co/transaction/verify/{reference}", headers=headers)
    res = response.json()

    if res.get("data") and res["data"]["status"] == "success":
        user_email = res['data']['customer']['email']
        amount = res['data']['amount']

        send_email_to_user(user_email, amount) 
        return "✅ Payment successful! Thank you for supporting me. Don't forget to check your spam messages in your email." 
    else:
        return "❌ Payment failed or not verified."

#Error Handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


#MANGA PAGES
@app.route('/download/manga/sukuna')
def sukuna_mg():
    return render_template('sukuna-mg.html')

@app.route('/download/manga/gojo')
def gojo_mg():
    return render_template('gojo-mg.html')

@app.route('/download/manga/goku')
def goku_mg():
    return render_template('goku-mg.html')

@app.route('/download/manga/yuta')
def yuta_mg():
    return render_template('yuta-mg.html')

@app.route('/download/manga/luffy')
def luffy_mg():
    return render_template('luffy-mg.html')

@app.route('/download/manga/isagi')
def isagi_mg():
    return render_template('isagi-mg.html')

@app.route('/download/manga/saitama')
def saitama_mg():
    return render_template('saitama-mg.html')

@app.route('/download/manga/nagi')
def nagi_mg():
    return render_template('nagi-mg.html')

@app.route('/download/manga/sae')
def sae_mg():
    return render_template('sae-mg.html')

@app.route('/download/manga/rin')
def rin_mg():
    return render_template('rin-mg.html')

@app.route('/download/manga/aizen')
def aizen_mg():
    return render_template('aizen-mg.html')



#ANIME PAGES
@app.route('/download/anime/sukuna')
def sukuna_an():
    return  render_template('sukuna-an.html')

@app.route('/download/anime/gojo')
def gojo_an():
    return render_template('gojo-an.html')

@app.route('/download/anime/goku')
def goku_an():
    return render_template('goku-an.html')

@app.route('/download/anime/muzan')
def muzan_an():
    return render_template('muzan-an.html')

@app.route('/download/anime/tanjiro')
def tanjiro_an():
    return render_template('tanjiro-an.html')

@app.route('/download/anime/yuji')
def yuji_an():
    return render_template('yuji-an.html')

@app.route('/download/anime/rin')
def rin_an():
    return render_template('rin-an.html')

@app.route('/download/anime/zoro')
def zoro_an():
    return render_template('zoro-an.html')

@app.route('/download/anime/sanji')
def sanji_an():
    return render_template('sanji-an.html')

@app.route('/download/anime/sae')
def sae_an():
    return render_template('sae-an.html')

@app.route('/download/anime/isagi')
def isagi_an():
    return render_template('isagi-an.html')

@app.route('/download/anime/yuta')
def yuta_an():
    return render_template('yuta-an.html')

@app.route('/download/anime/luffy')
def luffy_an():
    return render_template('luffy-an.html')

@app.route('/download/anime/saitama')
def saitama_an():
    return render_template('saitama-an.html')

@app.route('/download/anime/boa-hancock')
def hancock_an():
    return render_template('hancock-an.html')

@app.route('/download/anime/nagi')
def nagi_an():
    return render_template('nagi-an.html')

@app.route('/donload/anime/one-piece')
def one_piece_an():
    return render_template('one-piece.html')

@app.route('/download/anime/demon-slayer')
def demon_slayer_an():
    return render_template('demon-slayer.html')

@app.route('/download/anime/solo-leveling')
def solo_leveling_an():
    return render_template('solo-leveling.html')

@app.route('/download/anime/aizen')
def aizen_an():
    return render_template('aizen-an.html')

@app.route('/download/anime/one-punch-man')
def one_punch_man_an():
    return render_template('one-punch-man.html')

@app.route('/download/anime/blue-lock')
def blue_lock_an():
    return render_template('blue-lock.html')



if __name__ == "__main__":

    app.run(debug=True)


