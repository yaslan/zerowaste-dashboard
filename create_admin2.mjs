import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf8');
const envVars = {};
envContent.split(/\r?\n/).forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        envVars[match[1].trim()] = match[2].trim();
    }
});

const supabase = createClient(envVars['VITE_SUPABASE_URL'], envVars['VITE_SUPABASE_ANON_KEY']);

async function createNewAdmin() {
    console.log('Yeni E-posta Onay Ayarları ile Admin2 oluşturuluyor...');

    const { data, error } = await supabase.auth.signUp({
        email: 'admin2@zerowaste.city',
        password: 'AdminPassword2026!'
    });

    if (error) {
        console.error('Hata:', error.message);
    } else {
        console.log('BAŞARILI! Yeni kullanıcı e-postası:', data.user?.email);
        if (data.session === null) {
            console.log('UYARI: Supabase "Confirm Email" ayarınız HALA AÇIK!');
        } else {
            console.log('MÜKEMMEL: Confirm Email ayarını başarıyla kapatmışsınız. Doğrudan giriş yapabilirsiniz.');
        }
    }
}

createNewAdmin();
