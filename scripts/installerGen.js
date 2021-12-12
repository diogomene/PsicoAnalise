const electronInstaller = require('electron-winstaller');



    try {
       electronInstaller.createWindowsInstaller({
          appDirectory: './temp/PsicoAnalise-win32-x64',
          outputDirectory: './temp/installer',
          authors: 'Diogo Menezes',
          exe: 'PsicoAnalise.exe',
          setupIcon: './assets/buildIcon.ico',
          iconUrl:'https://cdn-icons-png.flaticon.com/512/3143/3143314.png'
        });
        console.log('It worked!');
      } catch (e) {
        console.log(`No dice: ${e.message}`);
      }
