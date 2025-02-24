import { useTranslation } from "react-i18next";
import MapView from "./map.view";

interface ConfirmationCardProps {
    lat: number,
    lang: number,
    handleClose: () => void,
    handleConfirm: () => void,
    isLoading?: boolean
}

export default function ConfirmationCard(props: ConfirmationCardProps) {

    const { t } = useTranslation()

    return (
        <div className="w-full max-w-2xl backdrop-blur-xl bg-gradient-to-br from-white/80 to-orange-50/90 rounded-xl shadow-lg shadow-orange-200/30 p-8 space-y-6 relative border border-orange-100/50">
            <div className="space-y-2">
                <h3 className="text-2xl font-medium bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    {t("confirmTitle")}
                </h3>
                <p className="text-sm text-orange-600/80">{t("confirmSubTitle")}</p>
            </div>
            {
                props.isLoading ? (
                    <span>{t('loading')}</span>
                ) : props.lat && props.lang ? (
                    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                        <MapView coordinates={[props.lat, props.lang]} />
                    </div>
                ) : <span> {t("hasError")} </span>
            }
            <div className="flex gap-4 pt-4">
                <button onClick={props.handleClose} className="flex-1 px-4 py-3 rounded-lg border-2 border-orange-200 text-orange-700 font-medium hover:bg-orange-50 focus:ring-2 focus:ring-orange-200 transition-colors">
                    {t("cancel")}
                </button>
                <button onClick={props.handleConfirm} disabled={props.isLoading || !props.lat && !props.lang} className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-orange-200 transition-all duration-200 shadow-sm shadow-orange-200/50">
                    {t("confirm")}
                </button>
            </div>
        </div>
    )
}

