import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// .env dosyasındaki değişkenleri oku
const envContent = fs.readFileSync('.env', 'utf8');
const envVars = {};
envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        envVars[match[1].trim()] = match[2].trim();
    }
});

const supabaseUrl = envVars['VITE_SUPABASE_URL'];
const supabaseKey = envVars['VITE_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdminUser() {
    console.log('Belediye Admin Kullanıcısı (admin@zerowaste.city) oluşturuluyor...');

    // Supabase Auth'a yeni kullanıcı kaydı (SignUp) gönderiyoruz
    const { data, error } = await supabase.auth.signUp({
        email: 'admin@zerowaste.city',
        password: 'AdminPassword2026!', // Güçlü şifre
        options: {
            data: {
                role: 'admin',
                department: 'City Waste Division'
            }
        }
    });

    if (error) {
        console.error('\n--- KULLANICI OLUŞTURMA HATASI ---');
        console.error('Hata Mesajı:', error.message);
    } else {
        console.log('\n--- BAŞARILI ---');
        console.log('Kullanıcı ID:', data.user?.id);
        console.log('E-posta:', data.user?.email);

        // E-posta Onayı (Email Confirmations) ayarı kontrolü
        if (data.user?.identities && data.user?.identities.length === 0) {
            console.log('\nUyarı: Bu e-posta zaten kayıtlı olabilir!');
        } else if (data.session === null) {
            console.log('\nNot: Supabase "Email Confirmations" (E-posta Onayı) açık.');
            console.log('Login olabilmek için ya sahte e-postayı doğrulamanız gerekecek ya da');
            console.log('Supabase Panel -> Authentication -> Providers -> Email altından "Confirm email" ayarını kapatmanız gerekecek.');
        } else {
            console.log('\nKullanıcı kayıt ve giriş (oturum) işlemi anında başarılı oldu!');
        }
    }
}

createAdminUser();
