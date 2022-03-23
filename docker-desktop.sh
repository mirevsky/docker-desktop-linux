#!/bin/bash

CURRENT_OS="Linux"
OS_DISTRO=""

find_current_os_type() {
  osType=$(uname)
  case "$osType" in
  "Darwin")
    {
      CURRENT_OS="OSX"
    }
    ;;
  "Linux")
    {
      # If available, use LSB to identify distribution
      if [ -f /etc/lsb-release -o -d /etc/lsb-release.d ]; then
        DISTRO=$(gawk -F= '/^NAME/{print $2}' /etc/os-release)
      else
        DISTRO=$(ls -d /etc/[A-Za-z]*[_-][rv]e[lr]* | grep -v "lsb" | cut -d'/' -f3 | cut -d'-' -f1 | cut -d'_' -f1)
      fi
      OS_DISTRO=$(echo $DISTRO | tr 'a-z' 'A-Z')
      CURRENT_OS="Linux"
    }
    ;;
  *)
    {
      CURRENT_OS="WINDOWS"
      exit
    }
    ;;
  esac
}

install_dependencies() {
  find_current_os_type

  # shellcheck disable=SC2077
  if [[ "$OS_DISTRO" =~ "FEDORA" ]]; then
    sudo dnf install -y gcc gobject-introspection-devel cairo-gobject-devel pkg-config python3-devel gtk3 python3-gobject python3-pip3 expect
  elif [[ "$OS_DISTRO" =~ "UBUNTU" ]] || [[ "$OS_DISTRO" =~ "DEBIAN" ]] || [[ "$OS_DISTRO" =~ "ELEMENTARY" ]]; then
    sudo apt -y build-dep cairo
    sudo apt update
    sudo apt install -y python3 python-dev python3-dev build-essential python3-gi python3-gi-cairo gir1.2-gtk-3.0 libgirepository1.0-dev gcc libcairo2-dev pkg-config python3-dev gir1.2-gtk-3.0 libssl-dev libffi-dev libxml2-dev libxslt1-dev zlib1g-dev python3-pip python3-venv python3-pip gir1.2-gtk-3.0 gir1.2-webkit2-4.0 python3-venv python3-pyqt5 python3-pyqt5.qtwebengine python3-pyqt5.qtwebchannel libqt5webkit5-dev expect
  elif [[ "$OS_DISTRO" =~ "MANJARO" ]]; then
    sudo pacman -S python cairo pkgconf gobject-introspection gtk3 qt5-webengine python-pyqt5-sip python-pyqt5-webengine python-qtpy python-cairo python-gobject python-pip3 expect
  elif [[ "$OS_DISTRO" =~ "SUSE" ]]; then
    sudo zypper install -y python3-gobject python3-gobject-Gdk typelib-1_0-Gtk-3_0 libgtk-3-0 expect
  fi
}

if [ -z $1 ]; then
  if [ -d $PWD/app/ ]; then
    WORKSPACE=$PWD/app
  else
    WORKSPACE=$PWD
  fi

  cd $WORKSPACE
  if [ ! -d venv/bin/ ]; then
    python3 -m venv venv
    sleep 2
    source venv/bin/activate
    pip3 install -r requirements.txt
  else
    source venv/bin/activate
  fi
  python3 main.py
else
  case $1 in
  install)
    install_dependencies

    if [ -d $PWD/app/venv/bin/ ]; then
      rm -rf $PWD/app/venv
    fi
    mkdir -p ~/.docker-desktop
    mkdir -p ~/.local/share/applications/
    cp -R $PWD/app ~/.docker-desktop
    APP_DIR=~/.docker-desktop
    echo "#!/bin/bash" >$APP_DIR/docker-desktop.sh
    echo "cd $APP_DIR/app" >>$APP_DIR/docker-desktop.sh
    echo "if [ ! -d $APP_DIR/app/venv/ ];then" >>$APP_DIR/docker-desktop.sh
    echo "  python3 -m venv venv" >>$APP_DIR/docker-desktop.sh
    echo "  sleep 2" >>$APP_DIR/docker-desktop.sh
    echo "  source venv/bin/activate" >>$APP_DIR/docker-desktop.sh
    echo "  pip3 install -r requirements.txt" >>$APP_DIR/docker-desktop.sh
    echo "else" >>$APP_DIR/docker-desktop.sh
    echo "  source venv/bin/activate" >>$APP_DIR/docker-desktop.sh
    echo "fi" >>$APP_DIR/docker-desktop.sh
    echo "python3 main.py" >>$APP_DIR/docker-desktop.sh

    chmod +x $APP_DIR/docker-desktop.sh

    echo "[Desktop Entry]" >~/.local/share/applications/docker-desktop.desktop
    echo "Version=0.0.1" >>~/.local/share/applications/docker-desktop.desktop
    echo "Name=Docker Desktop" >>~/.local/share/applications/docker-desktop.desktop
    echo "Comment=Docker Desktop Linux Community" >>~/.local/share/applications/docker-desktop.desktop
    echo "Exec=$APP_DIR/docker-desktop.sh" >>~/.local/share/applications/docker-desktop.desktop
    echo "Path=$APP_DIR/" >>~/.local/share/applications/docker-desktop.desktop
    echo "Icon=$APP_DIR/app/gui/resources/images/docker-logo.png" >>~/.local/share/applications/docker-desktop.desktop
    echo "Terminal=false" >>~/.local/share/applications/docker-desktop.desktop
    echo "Type=Application" >>~/.local/share/applications/docker-desktop.desktop
    echo "Categories=Utility;Development;" >>~/.local/share/applications/docker-desktop.desktop

    python3 -m $APP_DIR/app/venv venv
    sleep 2
    source $APP_DIR/venv/bin/activate
    pip3 install -r $APP_DIR/requirements.txt
    ;;
  *)
    cat $PWD/banner.txt
    echo ""
    echo "      Docker Desktop Community"
    ;;
  esac
fi
