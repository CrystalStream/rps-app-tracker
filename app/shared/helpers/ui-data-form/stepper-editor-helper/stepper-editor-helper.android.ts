import { Color } from 'color';

export function setStepperEditorContentOffset(editor, horizontalOffset: number, verticalOffset: number) {

}

export function setStepperEditorTextPostfix(editor, singularPostfix: string, pluralPostifx: string) {
  const numberPick:
    com.telerik.widget.numberpicker.RadNumberPicker =
    <com.telerik.widget.numberpicker.RadNumberPicker>editor.getEditorView();

  const labelView = numberPick.labelView();
  const numVal = parseInt(labelView.getText(), 10);
  if (numVal === 1) {
    labelView.setText(`1 ${singularPostfix}`);
  } else {
    labelView.setText(`${numVal} ${pluralPostifx}`);
  }
}


export function setStepperEditorColors(editor, lightColor: Color, darkColor: Color): void {
  const numberPicker: com.telerik.widget.numberpicker.RadNumberPicker =
    <com.telerik.widget.numberpicker.RadNumberPicker>editor.getEditorView();

  numberPicker.labelView().setTextColor(darkColor.android);
  numberPicker.decreaseView().setTextColor(darkColor.android);
  numberPicker.increaseView().setTextColor(darkColor.android);

  const background1 = new android.graphics.drawable.GradientDrawable();
  background1.setStroke(2, lightColor.android);
  numberPicker.rootView().setBackground(background1);

  const background2 = new android.graphics.drawable.GradientDrawable();
  background2.setStroke(2, lightColor.android);
  numberPicker.decreaseView().setBackground(background2);

  const background3 = new android.graphics.drawable.GradientDrawable();
  background3.setStroke(2, lightColor.android);
  numberPicker.increaseView().setBackground(background3);
}


declare module com {
  module telerik {
    module android {
      module common {
        class Procedure<t> {
          constructor(imp);
        }
      }
    }
    module widget {
      class RadioGroup {
        setPadding(l, t, r, b);
      }
      module numberpicker {
        class RadNumberPicker {
          rootView;
          labelView();
          decreaseView();
          increaseView();
        }
      }
    }
  }

}
