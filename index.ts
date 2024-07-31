import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as AdmZip from 'adm-zip';

const dataList = [
{"id":1,"url":"http://audio1.wordfree.net/bibles/app/audio/18_1.zip","name":"ปฐมกาล"},
{"id":2,"url":"http://audio1.wordfree.net/bibles/app/audio/18_2.zip","name":"อพยพ"},
{"id":3,"url":"http://audio1.wordfree.net/bibles/app/audio/18_3.zip","name":"เลวีนิติ"},
{"id":4,"url":"http://audio1.wordfree.net/bibles/app/audio/18_4.zip","name":"กันดารวิถี"},
{"id":5,"url":"http://audio1.wordfree.net/bibles/app/audio/18_5.zip","name":"พระราชบัญญัติ"},
{"id":6,"url":"http://audio1.wordfree.net/bibles/app/audio/18_6.zip","name":"โยชูวา"},
{"id":7,"url":"http://audio1.wordfree.net/bibles/app/audio/18_7.zip","name":"ผู้วินิจฉัย"},
{"id":8,"url":"http://audio1.wordfree.net/bibles/app/audio/18_8.zip","name":"นางรูธ"},
{"id":9,"url":"http://audio1.wordfree.net/bibles/app/audio/18_9.zip","name":"1 ซามูเอล"},
{"id":10,"url":"http://audio1.wordfree.net/bibles/app/audio/18_10.zip","name":"2 ซามูเอล"},
{"id":11,"url":"http://audio1.wordfree.net/bibles/app/audio/18_11.zip","name":"1 พงศ์กษัตริย์"},
{"id":12,"url":"http://audio1.wordfree.net/bibles/app/audio/18_12.zip","name":"2 พงศ์กษัตริย์"},
{"id":13,"url":"http://audio1.wordfree.net/bibles/app/audio/18_13.zip","name":"1 พงศาวดาร"},
{"id":14,"url":"http://audio1.wordfree.net/bibles/app/audio/18_14.zip","name":"2 พงศาวดาร"},
{"id":15,"url":"http://audio1.wordfree.net/bibles/app/audio/18_15.zip","name":"เอสรา"},
{"id":16,"url":"http://audio1.wordfree.net/bibles/app/audio/18_16.zip","name":"เนหะมีย์"},
{"id":17,"url":"http://audio1.wordfree.net/bibles/app/audio/18_17.zip","name":"เอสเธอร์"},
{"id":18,"url":"http://audio1.wordfree.net/bibles/app/audio/18_18.zip","name":"โยบ"},
{"id":19,"url":"http://audio1.wordfree.net/bibles/app/audio/18_19.zip","name":"เพลงสดุดี"},
{"id":20,"url":"http://audio1.wordfree.net/bibles/app/audio/18_20.zip","name":"สุภาษิต"},
{"id":21,"url":"http://audio1.wordfree.net/bibles/app/audio/18_21.zip","name":"ปัญญาจารย์"},
{"id":22,"url":"http://audio1.wordfree.net/bibles/app/audio/18_22.zip","name":"เพลงซาโลมอน"},
{"id":23,"url":"http://audio1.wordfree.net/bibles/app/audio/18_23.zip","name":"อิสยาห์"},
{"id":24,"url":"http://audio1.wordfree.net/bibles/app/audio/18_24.zip","name":"เยเรมีย์"},
{"id":25,"url":"http://audio1.wordfree.net/bibles/app/audio/18_25.zip","name":"เพลงคร่ำครวญ"},
{"id":26,"url":"http://audio1.wordfree.net/bibles/app/audio/18_26.zip","name":"เอเสเคียล"},
{"id":27,"url":"http://audio1.wordfree.net/bibles/app/audio/18_27.zip","name":"ดานิเอล"},
{"id":28,"url":"http://audio1.wordfree.net/bibles/app/audio/18_28.zip","name":"โฮเชยา"},
{"id":29,"url":"http://audio1.wordfree.net/bibles/app/audio/18_29.zip","name":"โยเอล"},
{"id":30,"url":"http://audio1.wordfree.net/bibles/app/audio/18_30.zip","name":"อาโมส"},
{"id":31,"url":"http://audio1.wordfree.net/bibles/app/audio/18_31.zip","name":"โอบาดีย์"},
{"id":32,"url":"http://audio1.wordfree.net/bibles/app/audio/18_32.zip","name":"โยนาห์"},
{"id":33,"url":"http://audio1.wordfree.net/bibles/app/audio/18_33.zip","name":"มีคาห์"},
{"id":34,"url":"http://audio1.wordfree.net/bibles/app/audio/18_34.zip","name":"นาฮูม"},
{"id":35,"url":"http://audio1.wordfree.net/bibles/app/audio/18_35.zip","name":"ฮาบากุก"},
{"id":36,"url":"http://audio1.wordfree.net/bibles/app/audio/18_36.zip","name":"เศฟันยาห์"},
{"id":37,"url":"http://audio1.wordfree.net/bibles/app/audio/18_37.zip","name":"ฮักกัย"},
{"id":38,"url":"http://audio1.wordfree.net/bibles/app/audio/18_38.zip","name":"เศคาริยาห์"},
{"id":39,"url":"http://audio1.wordfree.net/bibles/app/audio/18_39.zip","name":"มาลาคี"},
{"id":40,"url":"http://audio1.wordfree.net/bibles/app/audio/18_40.zip","name":"มัทธิว"},
{"id":41,"url":"http://audio1.wordfree.net/bibles/app/audio/18_41.zip","name":"มาระโก"},
{"id":42,"url":"http://audio1.wordfree.net/bibles/app/audio/18_42.zip","name":"ลูกา"},
{"id":43,"url":"http://audio1.wordfree.net/bibles/app/audio/18_43.zip","name":"ยอห์น"},
{"id":44,"url":"http://audio1.wordfree.net/bibles/app/audio/18_44.zip","name":"กิจการ"},
{"id":45,"url":"http://audio1.wordfree.net/bibles/app/audio/18_45.zip","name":"โรม"},
{"id":46,"url":"http://audio1.wordfree.net/bibles/app/audio/18_46.zip","name":"1 โครินธ์"},
{"id":47,"url":"http://audio1.wordfree.net/bibles/app/audio/18_47.zip","name":"2 โครินธ์"},
{"id":48,"url":"http://audio1.wordfree.net/bibles/app/audio/18_48.zip","name":"กาลาเทีย"},
{"id":49,"url":"http://audio1.wordfree.net/bibles/app/audio/18_49.zip","name":"เอเฟซัส"},
{"id":50,"url":"http://audio1.wordfree.net/bibles/app/audio/18_50.zip","name":"ฟีลิปปี"},
{"id":51,"url":"http://audio1.wordfree.net/bibles/app/audio/18_51.zip","name":"โคโลสี"},
{"id":52,"url":"http://audio1.wordfree.net/bibles/app/audio/18_52.zip","name":"1 เธสะโลนิกา"},
{"id":53,"url":"http://audio1.wordfree.net/bibles/app/audio/18_53.zip","name":"2 เธสะโลนิกา"},
{"id":54,"url":"http://audio1.wordfree.net/bibles/app/audio/18_54.zip","name":"1 ทิโมธี"},
{"id":55,"url":"http://audio1.wordfree.net/bibles/app/audio/18_55.zip","name":"2 ทิโมธี"},
{"id":56,"url":"http://audio1.wordfree.net/bibles/app/audio/18_56.zip","name":"ทิตัส"},
{"id":57,"url":"http://audio1.wordfree.net/bibles/app/audio/18_57.zip","name":"ฟีเลโมน"},
{"id":58,"url":"http://audio1.wordfree.net/bibles/app/audio/18_58.zip","name":"ฮีบรู"},
{"id":59,"url":"http://audio1.wordfree.net/bibles/app/audio/18_59.zip","name":"ยากอบ"},
{"id":60,"url":"http://audio1.wordfree.net/bibles/app/audio/18_60.zip","name":"1 เปโตร"},
{"id":61,"url":"http://audio1.wordfree.net/bibles/app/audio/18_61.zip","name":"2 เปโตร"},
{"id":62,"url":"http://audio1.wordfree.net/bibles/app/audio/18_62.zip","name":"1 ยอห์น"},
{"id":63,"url":"http://audio1.wordfree.net/bibles/app/audio/18_63.zip","name":"2 ยอห์น"},
{"id":64,"url":"http://audio1.wordfree.net/bibles/app/audio/18_64.zip","name":"3 ยอห์น"},
{"id":65,"url":"http://audio1.wordfree.net/bibles/app/audio/18_65.zip","name":"ยูดาส"},
{"id":66,"url":"http://audio1.wordfree.net/bibles/app/audio/18_66.zip","name":"วิวรณ์"},
];

const downloadFolder = path.join(__dirname, 'download');

async function downloadAndRename(): Promise<void> {
  for (const data of dataList) {
    try {
      const response = await axios.get(data.url, { responseType: 'arraybuffer' });

      // Ensure the download folder exists
      if (!fs.existsSync(downloadFolder)) {
        fs.mkdirSync(downloadFolder);
      }

      // Save the downloaded zip file with the original name in the "download" folder
      const filePath = path.join(downloadFolder, `${data.id}-${data.name}.zip`);
      // fs.writeFileSync(filePath, response.data);
      fs.writeFileSync(filePath, Buffer.from(response.data));

      // Extract the contents of the zip file to the same "download" folder
      // const zip = new AdmZip(filePath);
      // zip.extractAllTo(downloadFolder, true);
      const zip = new AdmZip(filePath);
      zip.extractAllTo(downloadFolder, true);

      console.log(`Downloaded and extracted: ${data.id}-${data.name}`);
    } catch (error: any) {
      console.error(`Error downloading or extracting ${data.id}-${data.name}: ${error.message}`);
    }
  }
}

// Call the function to start the download and extraction process
downloadAndRename();
